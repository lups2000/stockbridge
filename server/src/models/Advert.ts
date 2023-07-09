import { NOTFOUND } from 'dns';
import mongoose from 'mongoose';
import logger from '../config/logger';
import {
  AdvertStatus,
  AdvertType,
  Advert,
  ProductCategory,
  Colors,
} from '../entities/advertEntity';
import userModel from './User';
import { User } from '../entities/userEntity';

const Types = mongoose.Schema.Types;

const advertSchema = new mongoose.Schema<Advert>({
  productname: {
    type: Types.String,
    required: [true, 'Please add a product name'],
  },
  prioritized: {
    type: Types.Boolean,
    required: [true, 'Please specify if prioritized'],
  },
  quantity: {
    type: Types.Number,
    required: [true, 'Please add a quantity'],
  },
  description: {
    type: Types.String,
    required: [false, 'Please add a description'],
  },
  price: {
    type: Types.Number,
    required: [true, 'Please add a price'],
  },
  imageurl: {
    type: Types.String,
    required: [false, 'You could enter an image url'],
  },
  expirationDate: {
    type: Types.Date,
    required: [false, 'Please add an exipration date'],
  },
  purchaseDate: {
    type: Types.Date,
    required: [false, 'Please add an exipration date'],
  },
  createdAt: {
    type: Types.Date,
    required: [true, 'Please add a creation date'],
    default: Date.now,
  },
  color: {
    type: Types.String,
    enum: Object.values(Colors),
    required: [false, 'You could enter a color for the product'],
  },
  status: {
    type: Types.String,
    enum: Object.values(AdvertStatus),
    required: [true, 'You could enter the status of the advert'],
    default: 'Ongoing',
  },
  type: {
    type: Types.String,
    enum: Object.values(AdvertType),
    required: [false, 'Please add an advert type'],
  },
  category: {
    type: Types.String,
    enum: Object.values(ProductCategory),
    required: [true, 'Please add a product category'],
  },
  offers: [
    {
      type: Types.ObjectId,
      ref: 'Offer',
      required: [false, 'Please add an offer'],
    },
  ],
  reviews: [
    {
      type: Types.ObjectId,
      ref: 'Review',
      required: [false, 'Please add a review'],
    },
  ],
  store: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add a store'],
  },
  location: {
    type: {
      type: Types.String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Types.Number],
      index: '2dsphere',
    },
  },
});

advertSchema.pre('save', async function (next) {
  const store = await userModel.findById(this.store);

  if (store) {
    this.location = store.location;
  }
  next();
});

advertSchema.index({
  productname: 'text',
  description: 'text',
  category: 'text',
});

const advertModel = mongoose.model('Advert', advertSchema, 'adverts');
export default advertModel;
