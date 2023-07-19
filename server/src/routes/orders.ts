import { Router } from 'express';
import {
  cancelOrder,
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

orderRouter.route('/getOrderByOffer/:offer').get(protect, getOrdersOfOffer);

orderRouter.route('/cancelOrder/:id').put(protect, cancelOrder);

orderRouter.route('/').post(protect, postOrder).get(protect, getOrders);

orderRouter
  .route('/:id')
  .get(protect, getOrder)
  .put(protect, putOrder)
  .delete(protect, deleteOrder);
