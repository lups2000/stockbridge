import mongoose from "mongoose";
import {
  ADVERT_STATUS,
  ADVERT_TYPE,
  Advert,
  PRODUCT_CATEGORY,
} from "../entities/advertEntity";

const Types = mongoose.Schema.Types;

const advertSchema = new mongoose.Schema<Advert>({
  productname: {
    type: Types.String,
    required: [true, "Please add a title"],
  },
  prioritized: {
    type: Types.Boolean,
    required: [true, "Please specify if prioritized"],
  },
  quantity: {
    type: Types.Number,
    required: [true, "Please add a quantity"],
  },
  description: {
    type: Types.String,
    required: [true, "Please add a description"],
  },
  price: {
    type: Types.Number,
    required: [true, "Please add a price"],
  },
  expirationDate: {
    type: Types.Date,
    required: [true, "Please add an exipration date"],
  },
  status: {
    default: "ONGOING",
    enum: Object.values(ADVERT_STATUS),
    required: [true, "Please add a status"],
  },
  type: {
    enum: Object.values(ADVERT_TYPE),
    required: [true, "Please add an advert type"],
  },
  category: {
    enum: Object.values(PRODUCT_CATEGORY),
    required: [true, "Please add a product category"],
  },
  offers: [
    {
      type: Types.ObjectId,
      ref: "Offer",
      required: true,
    },
  ],
  reviews: [
    {
      type: Types.ObjectId,
      ref: "Review",
      required: true,
    },
  ],
  store: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const advertModel = mongoose.model("Advert", advertSchema, "adverts");
export default advertModel;
