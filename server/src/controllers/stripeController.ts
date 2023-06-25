import { type Request, type Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { AppError } from '../utils/errorHandler';
import { User } from '../entities/userEntity';
import {
  cancelStripeSubscription,
  createStripePaymentIntent,
  createStripeSetupIntent,
  createStripeSubscription,
  getSubscriptionInvoiceLink,
  webhookHandler,
} from '../services/stripeService';
import logger from '../config/logger';
import Stripe from 'stripe';

export const createPaymentIntent = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user as User;
    const { amount, product } = req.body;
    const paymentIntent = await createStripePaymentIntent(
      user,
      amount,
      product,
    );
    res.status(200).json(paymentIntent.client_secret);
  },
);

export const createSetupIntent = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user as User;
    const setupIntent = await createStripeSetupIntent(user);
    res.status(200).json(setupIntent.client_secret);
  },
);

export const createSubscription = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user as User;
    const { subscriptionType } = req.body;
    const { subscription, paymentIntent } = await createStripeSubscription(
      user,
      subscriptionType,
    );
    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    });
  },
);

export const cancelSubscription = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user as User;
    await cancelStripeSubscription(user);
    res.status(204).send();
  },
);

export const InvoiceLink = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user as User;
    const invoiceLink = await getSubscriptionInvoiceLink(user);
    res.status(200).send(invoiceLink);
  },
);

export const webhook = asyncHandler(async (req: Request, res: Response) => {
  logger.debug('Webhook received');
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    throw new AppError('No signature found', 'No signature found', 400);
  }
  let requestBuffer = await req.body;
  const ret = await webhookHandler(sig, requestBuffer);
  if (!ret) {
    throw new AppError('Webhook failed', 'Webhook failed', 400);
  }
  res.sendStatus(200);
});
