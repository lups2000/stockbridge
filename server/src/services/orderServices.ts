import orderModel from '../models/Order';
import type { Order } from '../entities/orderEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';

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
