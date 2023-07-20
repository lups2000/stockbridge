import mongoose from 'mongoose';
import logger from '../config/logger';
import { AdvertStatus } from '../entities/advertEntity';
import { Offer, OfferStatus } from '../entities/offerEntity';
import { OrderStatus, Order } from '../entities/orderEntity';
import { findAdvertById } from '../services/advertServices';
import {
  findAllOffersByAdvert,
  notifyAboutCanceledOffer,
} from '../services/offerServices';
import offerModel from './Offer';
import { createStripePaymentIntent } from '../services/stripeService';
import userModel from './User';
import advertModel from './Advert';
import { User } from '../entities/userEntity';
import { sendMail } from '../utils/mailService';

const Types = mongoose.Schema.Types;

export const orderSchema = new mongoose.Schema<Order>({
  totalPrice: {
    type: Types.Number,
    required: [true, 'Please add a total price'],
  },
  quantity: {
    type: Types.Number,
    required: [true, 'Please add a quantity'],
  },
  status: {
    type: Types.String,
    enum: Object.values(OrderStatus),
    required: [false, 'Please add an order status'],
  },
  offer: {
    type: Types.ObjectId,
    ref: 'Offer',
    required: true,
  },
  createdAt: {
    type: Types.Date,
    required: [true, 'Please add a creation date'],
  },
  paymentId: {
    type: Types.String,
  },
});
orderSchema.pre('findOneAndUpdate', async function (next) {
  const thisOrder = this.getUpdate() as Order;
  try {
    const thisFilter: { offer: string } = this.getQuery() as { offer: string };
    const offer = await offerModel.findById(thisFilter.offer);
    if (offer) {
      const advert = await findAdvertById(offer?.advert.toString());
      if (advert?.quantity && thisOrder.status == OrderStatus.RECEIVED) {
        advert.quantity = advert?.quantity - offer.quantity;
        if (advert.quantity <= 0) {
          advert.status = AdvertStatus.Closed;
        }
        const offers = await findAllOffersByAdvert(advert.id);
        for (const fetchedOffer of offers) {
          if (
            fetchedOffer.status === OfferStatus.OPEN &&
            fetchedOffer.quantity > advert.quantity
          ) {
            fetchedOffer.status = OfferStatus.CANCELED_OUT_OF_STOCK;
            await offerModel.findByIdAndUpdate(fetchedOffer.id, fetchedOffer);
            await notifyAboutCanceledOffer(fetchedOffer.id);
          }
        }
        await advertModel.findByIdAndUpdate(advert.id, advert);
      }
    }
    next();
  } catch (error) {
    logger.error(
      `Failed updating advert corresponding to order ${thisOrder.id}`,
    );
  }
});

orderSchema.pre<Order>('save', async function (next) {
  const offer = await offerModel.findById(this.offer);
  const advert = await advertModel.findById(offer?.advert.toString()!);
  const offeror = await userModel.findById(offer?.offeror.toString()!);
  const offeree = await userModel.findById(offer?.offeree.toString()!);
  let payer: User;
  if (advert && advert.type === 'Sell') {
    payer = offeror as User;
  } else {
    payer = offeree as User;
  }

  try {
    await sendMail(
      `${offeree?.email}, ${offeror?.email}`,
      `Order ${this.id} has been created`,
      `Order ${this.id} for advert ${advert?.productname} has been created and is awaiting payment`,
    );
  } catch (error) {
    logger.error(`Failed sending mail to ${offeree?.email}, ${offeror?.email}`);
  }

  const paymentIntent = await createStripePaymentIntent(
    payer as User,
    this.totalPrice,
    'offerId_' + (offer as unknown as Offer).id.toString(),
    {
      off_session: true,
      confirm: true,
    },
    true,
  );
  this.paymentId = paymentIntent.id;
});
export const orderModel = mongoose.model('Order', orderSchema, 'orders');
export default orderModel;
