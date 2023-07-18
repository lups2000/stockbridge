import mongoose from 'mongoose';
import {
  AdvertStatus,
  AdvertType,
  Advert,
  ProductCategory,
  Sizes,
  Options,
  EnergyClass,
  Color,
} from '../entities/advertEntity';
import userModel from './User';

const Types = mongoose.Schema.Types;

const ColorSchema = new mongoose.Schema<Color>({
  name: {
    type: Types.String,
    required: [false, 'please add the color name'],
  },
  hex: {
    type: Types.String,
    required: [false],
  },
});
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
  color: ColorSchema,
  energyClass: {
    type: Types.String,
    enum: Object.values(EnergyClass),
    required: [false, 'You could enter an energy Class for the product'],
  },
  size: {
    type: Types.String,
    enum: Object.values(Sizes),
    required: [false, 'You could enter a size for the product'],
  },
  sustainable: {
    type: Types.String,
    enum: Object.values(Options),
    required: [false, ''],
  },
  crueltyFree: {
    type: Types.String,
    enum: Object.values(Options),
    required: [false, ''],
  },
  recyclable: {
    type: Types.String,
    enum: Object.values(Options),
    required: [false, ''],
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
  fabric: {
    type: Types.String,
    required: [false, 'Please add the product fabric'],
  },
  material: {
    type: Types.String,
    required: [false, 'Please add the product material'],
  },
  width: {
    type: Types.Number,
    required: [false, ''],
  },
  height: {
    type: Types.Number,
    required: [false, ''],
  },
  length: {
    type: Types.Number,
    required: [false, ''],
  },
  weight: {
    type: Types.Number,
    required: [false, ''],
  },
  volume: {
    type: Types.Number,
    required: [false, ''],
  },
  pages: {
    type: Types.Number,
    required: [false, ''],
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

advertSchema.pre('findOneAndUpdate', async function (next) {
  const thisAdvert = this.getUpdate() as Advert;

  if (
    !Object.getOwnPropertyNames(thisAdvert).some(
      (property) => property != 'prioritized' && property != 'id',
    )
  ) {
    const fetchedAdvert = await advertModel.findById(thisAdvert.id);

    const concernedUser = await userModel.findOneAndUpdate(
      { _id: fetchedAdvert?.store },
      {
        $inc: { prioritisationTickets: -1 },
      },
    );
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
