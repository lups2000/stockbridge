import mongoose from 'mongoose';
import { ORDER_STATUS, Order } from '../entities/orderEntity';

const Types = mongoose.Schema.Types;

export const orderSchema = new mongoose.Schema<Order>({
  totalPrice: {
    type: Types.Number,
    required: [true, 'Please add a total price'],
  },
  quantity: {
    type: Types.Number,
    required: [true, 'Please add a quantity'],
  },
  status: {
    enum: Object.values(ORDER_STATUS),
    required: [false, 'Please add an order status'],
  },
  offer: {
    type: Types.ObjectId,
    ref: 'Offer',
    required: true,
  },
});

export const orderModel = mongoose.model('Order', orderSchema, 'orders');
export default orderModel;
