import { Advert } from "./advert";
import { User } from "./user";

export enum OfferStatus {
  OPEN,
  ACCEPTED,
  REJECTED,
  CANCELED,
}

export interface Offer {
  id: string;
  price: number;
  quantity: number;
  status: OfferStatus;
  message: string;
  createdAt: Date;
  offeror: User;
  offeree: User;
  advert: Advert;
}
