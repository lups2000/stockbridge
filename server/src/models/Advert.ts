import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import {
  AdvertStatus,
  AdvertType,
  Advert,
  ProductCategory,
  Colors,
} from '../entities/advertEntity';

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
    type: String,
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
  date: {
    type: Types.Date,
    required: [true, 'Please add a creation date'],
  },
  color: {
    type: String,
    enum: Object.values(Colors),
    required: [false, 'You could enter a color for the product'],
  },
  advertStatus: {
    type: String,
    enum: Object.values(AdvertStatus),
    required: [false, 'You could enter the status of the advert'],
  },
  type: {
    type: String,
    enum: Object.values(AdvertType),
    required: [false, 'Please add an advert type'],
  },
  category: {
    type: String,
    enum: Object.values(ProductCategory),
    required: [false, 'Please add a product category'],
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
    required: [false, 'Please add a store'],
  },
});

const advertModel = mongoose.model('Advert', advertSchema, 'adverts');
export default advertModel;
