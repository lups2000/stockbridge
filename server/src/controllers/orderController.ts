import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findOrderById,
  createOrder,
  updateOrder,
  delOrder,
  findAllOrders,
  findOrderByOffer,
} from '../services/orderServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { ObjectId } from 'mongodb';
import { Order } from '../entities/orderEntity';
import { AppError } from '../utils/errorHandler';
import { Offer } from '../entities/offerEntity';
import {
  findAllOffersByOfferee,
  findAllOffersByOfferor,
} from '../services/offerServices';
import { Advert } from '../entities/advertEntity';

/**
 * This method returns a order by id
 * @param req - The request object
 * @param res - The response object
 * @returns a order object.
 */
export const getOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = String(req.user?.id);

    let order = await findOrderById(id);
    await _checkUserCanEditOrDeleteOrder(req);
    res.status(200).json(order);
  },
);

/**
 * This method returns all orders.
 * @param req - The request object
 * @param res - The response object
 * @returns an array of order objects.
 */
export const getOrders = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    let orders = await findAllOrders();
    const userId = String(req.user?.id);
    // Return only orders related to the user.
    orders = _findAndCheckRelatedOrders(userId, orders);
    res.status(200).json(orders);
  },
);

/**
 * This method creates a new order.
 * @param req - The request object
 * @param res - The response object
 * @returns created order object.
 */
export const postOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  },
);

/**
 * This method updates a order by id.
 * @param req - The request object
 * @param res - The response object
 * @returns updated order object.
 */
export const putOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await _checkUserCanEditOrDeleteOrder(req);
    const order = await updateOrder(id, req.body);
    res.status(200).json(order);
  },
);

/**
 * This method deletes a order by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted order object.
 */
export const deleteOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await _checkUserCanEditOrDeleteOrder(req);
    const order = await delOrder(id);
    res.status(200).json(order);
  },
);

/**
 * This method returns an order corresponding to an offer   *
 * @param req - The request object
 * @param res - The response object
 * @returns retrieved order object.
 */
export const getOrdersOfOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { offer } = req.params;
    const userId = String(req.user?.id);
    let order = await findOrderByOffer(offer);

    order = _findAndCheckRelatedOrders(userId, order)[0];
    res.status(200).json(order);
  },
);

/**
 * This method gets all orders that match the request body parameters  *
 * @param req - The request object
 * @param res - The response object
 * @returns the requested orders.
 */
export const getUserSpecificOrders = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { user, orderType } = req.query;
    const userId = req.user?.id;

    if (userId != user) {
      throw new AppError(
        'Not authorized to access this route',
        'Not authorized to access this route',
        401,
      );
    }
    let offers: Offer[];
    switch (orderType) {
      // Gets the related offers in case the order is of type Ask / Buying
      case 'Ask': {
        let offersByOfferor = await findAllOffersByOfferor(user as string) as Offer[];
        offersByOfferor = offersByOfferor.filter((x) => x.advert && (x.advert as unknown as Advert).type === 'Sell');
        let offersByOfferee = await findAllOffersByOfferee(user as string) as Offer[];
        offersByOfferee = offersByOfferee.filter((x) => x.advert && (x.advert as unknown as Advert).type === 'Ask');
        offers = offersByOfferor.concat(offersByOfferee);
        break;
      }
      // Gets the related offers in case the order is of type Sell
      case 'Sell': {
        let offersByOfferor = await findAllOffersByOfferor(user as string) as Offer[];
        offersByOfferor = offersByOfferor.filter((x) => x.advert && (x.advert as unknown as Advert).type === 'Ask');
        let offersByOfferee = await findAllOffersByOfferee(user as string) as Offer[];
        offersByOfferee = offersByOfferee.filter((x) => x.advert && (x.advert as unknown as Advert).type === 'Sell');
        offers = offersByOfferor.concat(offersByOfferee);
        break;
      }
      default: {
        throw new AppError('Unknown offer type', 'Unknown offer type', 400);
      }
    }

    // Get the orders corresponding to the offers.
    // Using the index 0 in the map is because the findOrderByOffer returns a list of orders
    let orders = (await Promise.all(offers.flatMap(async x => (await findOrderByOffer(x.id))[0]))).filter(x => x != null);
    res.status(200).json(orders);
  },
);

/**
 * Checks if a user can edit or delete an order with a given id.
 * @param req The request containing the to be checked ids.
 */
async function _checkUserCanEditOrDeleteOrder(req: AuthenticatedRequest) {
  let userId = new ObjectId(req.user?.id);
  const { id } = req.params;

  // The user editing or deleting must be the offeror or offeree.
  let offerOfOrder = (await findOrderById(id)).offer;
  if (
    !offerOfOrder.offeree.equals(userId) &&
    !offerOfOrder.offeror.equals(userId)
  ) {
    throw new AppError(
      'Not authorized to edit this route',
      'Not authorized to edit this route',
      401,
    );
  }
}

/**
 * Returns a filtered list of that contains only orders related to the requesting user.
 * @param userId the requesting userId.
 * @param orders the returned orders list before the user check.
 * @returns the filtered list.
 */
function _findAndCheckRelatedOrders(userId: string, orders: Order[]): any {
  if (orders.length == 0 )
  {
    return orders;
  }
  
  let relatedOrders = orders.filter(
    (x) =>
      (x.offer.offeror && x.offer.offeror.equals(userId)) ||
      (x.offer.offeree && x.offer.offeree.equals(userId)),
  );

  // If no offers are retrieved with this request, throw an exception to inform the user.
  if (!relatedOrders?.length) {
    throw new AppError(
      'Not authorized to access this route',
      'Not authorized to access this route',
      401,
    );
  }

  return relatedOrders;
}
