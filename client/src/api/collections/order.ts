import { ApiClient } from '../apiClient';

export enum OrderStatus {
  PAYMENT_PENDING = 'Payment Pending',
  SHIPMENT_PENDING = 'Shipment Pending',
  RECEIVED = 'Received',
}

export interface PopulatedOrder {
  _id: string;
  totalPrice: number;
  quantity: number;
  status: OrderStatus;
  offer: string;
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

export interface Order {
  _id: string;
  totalPrice: number;
  quantity: number;
  status: OrderStatus;
  offer: string;
}
