import { Router } from 'express';
import {
  deleteOrder,
  getOrder,
  getOrders,
  getOrdersOfOffer,
  getUserSpecificOrders,
  postOrder,
  putOrder,
} from '../controllers/orderController';
import { protect } from '../middlewares/authMiddleware';

export const orderRouter = Router();

orderRouter.route('/getUserSpecificOrders').get(protect, getUserSpecificOrders);

orderRouter.route('/getOrderByOffer/:offer').get(getOrdersOfOffer);

orderRouter.route('/').post(postOrder).get(getOrders);

orderRouter.route('/:id').get(getOrder).put(putOrder).delete(deleteOrder);
