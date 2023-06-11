import { Advert } from './advertEntity';
import { User } from './userEntity';

export enum OfferStatus {
  PENDING,
  ACCEPTED,
  DENIED,
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
