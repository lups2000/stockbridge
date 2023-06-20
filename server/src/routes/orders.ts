import { Router } from 'express';
import {
  deleteOrder,
  getOrder,
  getOrders,
  getOrdersOfOffer,
  postOrder,
  putOrder,
} from '../controllers/orderController';

export const orderRouter = Router();

orderRouter.route('/').post(postOrder).get(getOrders);

orderRouter.route('/:id').get(getOrder).put(putOrder).delete(deleteOrder);

orderRouter.route('/getOrderByOffer/:offer').get(getOrdersOfOffer);
