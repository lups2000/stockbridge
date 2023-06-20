import mongoose from 'mongoose';
import { Offer, OfferStatus } from '../entities/offerEntity';

const Types = mongoose.Schema.Types;

export const offerSchema = new mongoose.Schema<Offer>({
  price: {
    type: Types.Number,
    required: [true, 'Please add a price'],
  },
  quantity: {
    type: Types.Number,
    required: [true, 'Please add a quantity'],
  },
  status: {
    type: Types.String,
    enum: Object.values(OfferStatus),
    required: [false, 'Please add a status'],
  },
  message: {
    type: Types.String,
  },
  createdAt: {
    type: Types.Date,
    required: [true, 'Please add a date'],
  },
  offeror: {
    type: Types.ObjectId,
    ref: 'User',
    required: false,
  },
  offeree: {
    type: Types.ObjectId,
    ref: 'User',
    required: false,
  },
  advert: {
    type: Types.ObjectId,
    ref: 'Advert',
    required: false,
  },
});

export const offerModel = mongoose.model('Offer', offerSchema, 'offers');
export default offerModel;
