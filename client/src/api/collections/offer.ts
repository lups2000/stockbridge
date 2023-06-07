import { Advert } from "./advert";
import { User } from "./user";

export enum OfferStatus {
  OPEN = "Open",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
  CANCELED = "Canceled",
}

export interface Offer {
  id: string;
  price: number;
  quantity: number;
  status?: OfferStatus;
  message: string;
  createdAt: Date;
  offeror?: User;
  offeree?: User;
  advert?: string;
}
