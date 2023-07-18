import { Offer } from './offerEntity';

export enum OrderStatus {
  PAYMENT_PENDING,
  SHIPMENT_PENDING,
  RECEIVED,
}

export interface Order {
  id: string;
  totalPrice: number;
  quantity: number;
  status: OrderStatus;
  offer: Offer;
  createdAt: Date;
  paymentId: string;
}
