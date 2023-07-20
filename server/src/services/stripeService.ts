import logger from '../config/logger';
import {
  SubscriptionStatus,
  SubscriptionType,
  User,
} from '../entities/userEntity';
import environment from '../utils/environment';
import Stripe from 'stripe';
import { AppError } from '../utils/errorHandler';
import { handleSubscription } from './userServices';
import userModel from '../models/User';
import orderModel from '../models/Order';
import { OrderStatus } from '../entities/orderEntity';
import { notifyAboutOrder } from './orderServices';

const serviceName = 'stripeService';
const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
});

/**
 * Creates a stripe customer for payment
 * @param user user id for which the stripe customer will be created
 * @returns
 */
export const createStripeCustomer = async (user: User) => {
  logger.debug(`${serviceName}: Creating stripe customer for ${user.email}`);
  return await stripe.customers.create({
    email: user.email,
    name: user.name,
    phone: user.phoneNumber,
    metadata: {
      userId: user.id,
    },
  });
};

/**
 * Creates a payment intent with the user
 * @param user user creating the payment intent
 * @param amount amount of monry in the payment
 * @param product the product for which the payment will be issued
 * @param config configuration of payment intent (redirect url for example)
 * @param automaticPaymentMethods
 * @returns
 */

export const createStripePaymentIntent = async (
  user: User,
  amount: number,
  product: string,
  config?: any,
  automaticPaymentMethods?: boolean,
) => {
  logger.debug(
    `${serviceName}: Creating stripe payment intent for ${user.email}`,
  );
  const customer = (await stripe.customers.retrieve(
    user.stripeCustomerId,
  )) as Stripe.Customer;
  const paymentMethod = automaticPaymentMethods
    ? {
        payment_method: customer.invoice_settings.default_payment_method,
      }
    : {};
  return await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'eur',
    customer: user.stripeCustomerId,
    // payment_method: customer.default_source,
    metadata: {
      userId: user.id,
      product: product,
    },
    ...config,
    ...paymentMethod,
  });
};

/**
 * Used in the signup step to setup payment method of the user
 * @param user
 * @returns
 */

export const createStripeSetupIntent = async (user: User) => {
  logger.debug(
    `${serviceName}: Creating stripe setup intent for ${user.email}`,
  );
  return await stripe.setupIntents.create({
    customer: user.stripeCustomerId,
    metadata: {
      userId: user.id,
    },
    usage: 'off_session',
    payment_method_types: ['card'],
  });
};

/**
 * Deletes inactive subscriptions and keeps the currently active one
 * @param customer
 */
const delUselessSubscriptions = async (customer: Stripe.Customer) => {
  if (customer.subscriptions) {
    for (const subscription of customer.subscriptions.data) {
      if (
        ['canceled', 'incomplete', 'incomplete_expired'].includes(
          subscription.status,
        )
      ) {
        customer.subscriptions.data = customer.subscriptions.data.filter(
          (sub) => sub.id !== subscription.id,
        );
        await stripe.subscriptions.del(subscription.id);
      }
    }
  }
};

/**
 * Creates a subscription for the user
 * @param user
 * @param subscriptionType
 */
export const createStripeSubscription = async (
  user: User,
  subscriptionType: SubscriptionType,
) => {
  logger.debug(
    `${serviceName}: Creating stripe subscription for ${user.email}`,
  );
  let priceId;
  switch (subscriptionType) {
    case SubscriptionType.BASIC_SUBSCRIPTION:
      priceId = 'price_1NKhLmHGv7rRxdJfB2dX1yVK';
      break;
    case SubscriptionType.ADVANCED_SUBSCRIPTION:
      priceId = 'price_1NKhMdHGv7rRxdJfiEeuXc1F';
      break;
    case SubscriptionType.PREMIUM_SUBSCRIPTION:
      priceId = 'price_1NKhMwHGv7rRxdJf7PgR5sKa';
      break;
    default:
      throw new AppError('Invalid subscription', 'Invalid subscription', 400);
  }
  const customer = (await stripe.customers.retrieve(user.stripeCustomerId, {
    expand: ['subscriptions'],
  })) as Stripe.Customer;

  await delUselessSubscriptions(customer);

  if (customer.subscriptions && customer.subscriptions.data.length > 0) {
    logger.error('User already has a subscription');
    logger.error(customer.subscriptions.data);
    throw new AppError(
      'User already has a subscription',
      'User already has a subscription',
      400,
    );
  }
  const subscription = await stripe.subscriptions.create({
    customer: user.stripeCustomerId,
    items: [
      {
        price: priceId,
      },
    ],
    metadata: {
      userId: user.id,
      product: subscriptionType,
    },
    payment_behavior: 'default_incomplete',
    collection_method: 'charge_automatically',
    expand: ['latest_invoice.payment_intent'],
  });
  const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
  let paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;
  paymentIntent = await stripe.paymentIntents.update(paymentIntent.id, {
    metadata: {
      userId: user.id,
      product: subscriptionType,
    },
  });

  return { subscription, paymentIntent };
};

/**
 * Cancels the stripe subscription of the user
 *
 * @param user
 * @returns
 */
export const cancelStripeSubscription = async (user: User) => {
  logger.debug(
    `${serviceName}: Canceling stripe subscription for ${user.email}`,
  );
  const customer = (await stripe.customers.retrieve(user.stripeCustomerId, {
    expand: ['subscriptions'],
  })) as Stripe.Customer;

  logger.debug('Deleting useless subscriptions');
  logger.debug(customer.subscriptions);
  await delUselessSubscriptions(customer);
  logger.debug('Deleted useless subscriptions');
  logger.debug(customer.subscriptions);
  if (
    !customer.subscriptions ||
    customer.subscriptions.data.length !== 1 ||
    !customer.subscriptions.data[0].id
  ) {
    throw new AppError(
      'User does not have a subscription',
      'User does not have a subscription',
      400,
    );
  }
  logger.info('Deleting subscription');
  await stripe.subscriptions.del(customer.subscriptions.data[0].id);
  logger.info('Deleted subscription');
  return;
};

/**
 * Gets the stripe subscription invoice link. This is needed if the subscription renewal fails
 * @param user
 */

export const getSubscriptionInvoiceLink = async (user: User) => {
  logger.debug(
    `${serviceName}: Getting stripe subscription invoice for ${user.email}`,
  );
  const customer = (await stripe.customers.retrieve(user.stripeCustomerId, {
    expand: ['subscriptions'],
  })) as Stripe.Customer;
  if (
    !customer.subscriptions ||
    customer.subscriptions.data.length !== 1 ||
    !customer.subscriptions.data[0].id
  ) {
    throw new AppError(
      'User does not have a subscription',
      'User does not have a subscription',
      400,
    );
  }
  const subscription = customer.subscriptions.data[0];
  const invoice = (await stripe.invoices.retrieve(
    subscription.latest_invoice as string,
  )) as Stripe.Invoice;
  return invoice.hosted_invoice_url;
};

/**
 * Handles events from the stripe
 * @param sig
 * @param reqBody
 */
export const webhookHandler = async (
  sig: string | string[],
  reqBody: Buffer,
) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      reqBody,
      sig,
      environment.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    logger.error(`${serviceName}: Webhook error: ${err}`);
    throw new AppError('Webhook error', 'Webhook error', 400);
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      logger.debug(`${serviceName}: PaymentIntent was successful!`);
      await handleSuccessfulPaymentIntent(
        paymentIntent.metadata.userId,
        paymentIntent.metadata.product,
      );
      break;
    // ... handle other event types
    case 'setup_intent.succeeded':
      logger.debug(`${serviceName}: SetupIntent was successful!`);
      const setupIntent = event.data.object as Stripe.SetupIntent;
      await stripe.customers.update(setupIntent.customer as string, {
        invoice_settings: {
          default_payment_method: setupIntent.payment_method as string,
        },
      });
      break;
    case 'customer.subscription.updated':
      logger.debug(`${serviceName}: Subscription was updated!`);
    case 'customer.subscription.deleted':
      logger.debug(`${serviceName}: Subscription was deleted!`);
    case 'customer.subscription.created':
      logger.debug(`${serviceName}: Subscription was created!`);
      const subscription = event.data.object as Stripe.Subscription;
      if (
        subscription.metadata.product !== 'Basic Subscription' &&
        subscription.metadata.product !== 'Advanced Subscription' &&
        subscription.metadata.product !== 'Premium Subscription'
      ) {
        throw new AppError('Invalid subscription', 'Invalid subscription', 400);
      }
      if (
        subscription.status !== 'paused' &&
        subscription.status !== 'trialing'
      ) {
        await handleSubscription(
          subscription.metadata.userId,
          subscription.status as SubscriptionStatus,
          subscription.metadata.product as SubscriptionType,
          new Date(subscription.current_period_start * 1000),
          new Date(subscription.current_period_end * 1000),
        );
      } else {
        throw new AppError('Invalid subscription', 'Invalid subscription', 400);
      }

      break;
    default:
      logger.error(`${serviceName}: Received ${event.type} unhandled event`);
  }
  // Return a response to acknowledge receipt of the event
  return true;
};

/**
 * Handles successful payment intent
 * @param userId
 * @param product
 */
export const handleSuccessfulPaymentIntent = async (
  userId: string,
  product: string,
) => {
  logger.debug(
    `${serviceName}: Handling successful payment intent for ${userId} and ${product}`,
  );
  const user = (await userModel.findById(userId)) as User;
  switch (true) {
    case product === 'Basic Pack':
      user.prioritisationTickets += 5;
      break;
    case product === 'Advanced Pack':
      user.prioritisationTickets += 10;
      break;
    case product === 'Premium Pack':
      user.prioritisationTickets += 20;
      break;
    case product === 'Basic Subscription':
    case product === 'Advanced Subscription':
    case product === 'Premium Subscription':
      return;
    case product.startsWith('offerId_'):
      const offerId = product.split('_')[1];
      logger.debug(
        `${serviceName}: Handling successful payment intent for ${offerId}`,
      );
      logger.debug(`${serviceName}: Updating order status to RECEIVED`);
      await orderModel.findOneAndUpdate(
        { offer: offerId },
        {
          status: OrderStatus.RECEIVED,
        },
      );

      await notifyAboutOrder(offerId, false);
      break;
    default:
      throw new AppError('Product not found', 'Product not found', 404);
  }
  await userModel.findByIdAndUpdate(user.id, user);
};
