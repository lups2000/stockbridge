import { Offer } from "./offer";

export enum ORDER_STATUS {
    PAYMENT_PENDING,
    SHIPMENT_PENDING,
    RECEIVED
}

export interface Order {
    id: string;
    totalPrice: number;
    quantity: number,
    status: ORDER_STATUS,
    offer: Offer;
}
