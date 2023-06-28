import { Types } from 'mongoose';

export enum OfferStatus {
  OPEN = 'Open',
  ACCEPTED = 'Accepted',
  REJECTED = 'REJECTED',
  CANCELED = 'Canceled',
}

export interface Offer {
  id: string;
  price: number;
  quantity: number;
  status: OfferStatus;
  message?: string;
  createdAt: Date;
  offeror: Types.ObjectId;
  offeree: Types.ObjectId;
  advert: Types.ObjectId;
}
