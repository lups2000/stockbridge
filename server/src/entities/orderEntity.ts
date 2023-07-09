import { Offer } from './offerEntity';

export enum OrderStatus {
  PAYMENT_PENDING = 'Payment Pending',
  SHIPMENT_PENDING = 'Shipment Pending',
  RECEIVED = 'Received',
}

export interface Order {
  id: string;
  totalPrice: number;
  quantity: number;
  status: OrderStatus;
  offer: Offer;
  createdAt: Date;
}
