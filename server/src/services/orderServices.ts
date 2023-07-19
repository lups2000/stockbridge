import orderModel from '../models/Order';
import type { Order } from '../entities/orderEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';
import { OrderStatus } from '../entities/orderEntity';
import advertModel from '../models/Advert';
import offerModel from '../models/Offer';
import { User } from '../entities/userEntity';
import { sendMail } from '../utils/mailService';
import userModel from '../models/User';
import { OfferStatus } from '../entities/offerEntity';

const serviceName = 'orderServices';

/**
 * Finds an order by id.
 * @param id
 * @returns Promise containing the order
 */
export const findOrderById = async (id: string) => {
  logger.debug(`${serviceName}: Finding order with id: ${id}`);
  const order = await orderModel.findById(id);

  if (!order) {
    logger.error(`${serviceName}: Order not found with id of ${id}`);
    throw new AppError('Order not found', 'Order not found', 404);
  }

  logger.debug(`${serviceName}: Returning order ${order}`);
  return order;
};

/**
 * Creates an order.
 * @param order
 * @returns Promise containing the order
 */
export const createOrder = async (order: Order) => {
  logger.debug(`${serviceName}: Creating order ${order.id}`);
  return await orderModel.create(order);
};

/**
 * Updates an order.
 * @param id
 * @param order
 * @returns Promise containing the updated order
 */
export const updateOrder = async (id: string, order: Order) => {
  logger.debug(`${serviceName}: Updating order with id: ${id} with ${order}`);
  return orderModel.findByIdAndUpdate(id, order, {
    new: true,
    runValidators: true,
  });
};

const getRelatedObjects = async (offerId: string) => {
  const offer = await offerModel.findById(offerId);
  if (!offer) {
    logger.error(`${serviceName}: Offer not found with id of ${offerId}`);
    throw new AppError('Offer not found', 'Offer not found', 404);
  }
  const advert = await advertModel.findById(offer.advert);

  if (!advert) {
    logger.error(`${serviceName}: Advert not found with id of ${offer.advert}`);
    throw new AppError('Advert not found', 'Advert not found', 404);
  }

  return { offer, advert };
};

/**
 * cancel an order.
 * @param id
 * @param user
 * @returns Promise containing the updated order
 */
export const cancelOrder = async (id: string, user: User) => {
  logger.debug(`${serviceName}: cancelling order with id: ${id}`);

  const order = await orderModel.findById(id);
  if (!order) {
    logger.error(`${serviceName}: Order not found with id of ${id}`);
    throw new AppError('Order not found', 'Order not found', 404);
  }

  if (order.status === OrderStatus.CANCELLED) {
    logger.error(`${serviceName}: Order already cancelled`);
    throw new AppError(
      'Order already cancelled',
      'Order already cancelled',
      400,
    );
  } else if (order.status === OrderStatus.RECEIVED) {
    logger.error(`${serviceName}: Order already received`);
    throw new AppError('Order already received', 'Order already received', 400);
  }

  let { offer, advert } = await getRelatedObjects(order.offer.toString());

  if (
    (advert.type === 'Ask' && offer.offeree._id.toString() !== user?.id) ||
    (advert.type === 'Sell' && offer.offeror._id.toString() !== user?.id)
  ) {
    if (offer.offeree._id.toString() !== user?.id) {
      logger.error(`${serviceName}: User not authorized to cancel order`);
      throw new AppError('User not authorized', 'User not authorized', 401);
    }
  }

  // await advertModel.findByIdAndUpdate(
  //   offer.advert,
  //   {
  //     $inc: { quantity: offer.quantity },
  //     status: AdvertStatus.Ongoing,
  //   },
  //   {
  //     new: true,
  //   },
  // )!;

  await orderModel.findByIdAndUpdate(
    id,
    {
      status: OrderStatus.CANCELLED,
    },
    {
      runValidators: true,
    },
  );

  await offerModel.findByIdAndUpdate(order.offer, {
    status: OfferStatus.CANCELED_USER
  },{
    runValidators: true,
  },)

  await notifyAboutOrder(offer.id, true);
};

export const notifyAboutOrder = async (id: string, cancelled: boolean) => {
  const { offer, advert } = await getRelatedObjects(id);
  const offeror = await userModel.findById(offer.offeror);
  const offeree = await userModel.findById(offer.offeree);
  if (!offeror || !offeree) {
    logger.error(
      `${serviceName}: Could not find offeror or offeree. Mail not sent`,
    );
  } else {
    await sendMail(
      `${offeree.email}, ${offeror.email}`,
      cancelled ? 'Order cancelled' : 'Order received',
      cancelled
        ? `Order of Offer ${id} for advert ${advert.productname} with ID: ${advert._id} has been cancelled.`
        : `Order of Offer ${id} for advert ${advert.productname} with ID: ${advert._id} has been received.`,
    );
  }
};

/**
 * Deletes an order.
 * @param id
 * @returns Promise containing the deleted order
 */
export const delOrder = async (id: string) => {
  logger.debug(`${serviceName}: Deleting order with id: ${id}`);
  return orderModel.findByIdAndDelete(id);
};

/**
 * Finds all orders -- Used only for debugging.
 * @returns Promise containing all orders
 */
export const findAllOrders = async () => {
  logger.debug(`${serviceName}: Finding all orders`);
  return orderModel.find();
};

/**
 * Returns an order created from an offer.
 * @param offer : id of the offer
 * @param populate : boolean determines if the result should be populated
 * @returns Promise containing the deleted advert.
 */
export const findOrderByOffer = async (offer: string, populate = true) => {
  logger.debug(`${serviceName}: Requesting the order of offer: ${offer}`);
  return await populateResult(orderModel.find({ offer: offer }), populate);
};

/**
 * Populates the referenced elements in a document
 * @param queryResult The document to be populated
 * @param populate Determines if the result should be populated
 * @returns
 */
function populateResult(queryResult: any, populate: boolean) {
  return populate ? queryResult.populate(['offer']) : queryResult;
}
