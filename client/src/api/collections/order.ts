import { ApiClient } from '../apiClient';
import { Offer, PopulatedOffer } from './offer';

export enum OrderStatus {
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  SHIPMENT_PENDING = 'SHIPMENT_PENDING',
  RECEIVED = 'RECEIVED',
}

export interface PopulatedOrder {
  _id: string;
  createdAt: string;
  totalPrice: number;
  quantity: number;
  status: OrderStatus;
  offer: Offer;
}

export interface NestedPopulatedOrder {
  _id: string;
  createdAt: string;
  totalPrice: number;
  quantity: number;
  status: OrderStatus;
  offer: PopulatedOffer;
}

const apiClient = new ApiClient();

export async function getOrder(id: string): Promise<Order> {
  return await apiClient.get<Order>(`/orders/${id}`, {
    withCredentials: true,
  });
}

export async function createOrder(order: Order): Promise<Order> {
  return await apiClient.post<Order>(`/orders/`, order, {
    withCredentials: true,
  });
}

export async function updateOrder(id: string, order: Order): Promise<Order> {
  return await apiClient.put<Order>(`/orders/${id}`, order, {
    withCredentials: true,
  });
}

export async function deleteOrder(id: string): Promise<void> {
  return await apiClient.delete<void>(`/orders/${id}`, {
    withCredentials: true,
  });
}

export async function getOrdersByAdvert(advert: string): Promise<Order[]> {
  return await apiClient.get<Order[]>(`/orders/getOrdersByAdvert/${advert}`, {
    withCredentials: true,
  });
}

/**
 * Returns orders filtered by the given parameters
 * @param user the user Id
 * @param advertType 'Ask' or 'Sell'
 * @returns
 */
export async function getUserSpecificOrders(
  user: string,
  orderType: string,
): Promise<PopulatedOrder[]> {
  console.debug(user, orderType);
  return await apiClient.get<PopulatedOrder[]>(
    `/orders/getUserSpecificOrders`,
    { withCredentials: true },
    { user: user, orderType: orderType },
  );
}

export interface Order {
  _id: string;
  totalPrice: number;
  quantity: number;
  status: OrderStatus;
  offer: string;
}
