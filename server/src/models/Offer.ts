import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import logger from '../config/logger';
import { Offer, OfferStatus } from '../entities/offerEntity';
import { OrderStatus } from '../entities/orderEntity';
import { findAdvertById } from '../services/advertServices';
import advertModel from './Advert';
import orderModel from './Order';

const Types = mongoose.Schema.Types;

class InsufficientStock extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Insufficiet Stock'; // Set the name of the error type
  }
}

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

// Or, in Node.js >= 7.6.0:
offerSchema.pre('save', async function(next) {
  const advert = await findAdvertById(this.advert.toString());
  if (this.quantity > advert.quantity) {
    this.status = OfferStatus.CANCELED_OUT_OF_STOCK;
  }
  next()
});

offerSchema.post<Offer>('save', async function (offer: Offer) {
  try {
    const advert = await findAdvertById(offer.advert.toString());
    const offerId = new ObjectId(offer.id)
    if (!advert.offers || advert.offers.length == 0) {

      advert.offers = [offerId]
    } else {
      if (!advert.offers?.includes(offerId)) {
        advert.offers.push(offerId);
      }
    }
      await advertModel.findByIdAndUpdate(advert.id, advert)
  } catch (error) {
    logger.error(`Failed updating advert corresponding to offer ${this.id}`);
  }
});
offerSchema.post<Offer>('findOneAndUpdate', async function (offer: Offer) {
  try {
    if (offer.status == 'Accepted') {
      const newOrder = new orderModel({
        totalPrice: (offer.quantity ?? 0) * (offer.price ?? 0),
        quantity: offer.quantity,
        status: OrderStatus.PAYMENT_PENDING,
        offer: offer.id,
        createdAt: new Date(),
      });
      await newOrder.save();
    }
  } catch (error) {
    logger.error(`Failed creating order for offer ${offer.id}`);
  }
});

export const offerModel = mongoose.model('Offer', offerSchema, 'offers');
export default offerModel;
