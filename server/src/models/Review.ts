import mongoose from 'mongoose';
import logger from '../config/logger';
import { Review } from '../entities/reviewEntity';
import advertModel from './Advert';

const Types = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema<Review>({
  rating: {
    type: Types.Number,
    required: [true, 'Please add a rating'],
    min: 1,
    max: 5,
  },
  description: {
    type: Types.String,
    required: [false, 'Please add a description'],
  },
  createdAt: {
    type: Types.Date,
    required: [false, 'Please add a creation date'],
  },
  reviewer: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewedAdvert: {
    type: Types.ObjectId,
    ref: 'Advert',
    required: true,
  },
});

reviewSchema.pre<Review>('save', async function (next) {
  try {
    await advertModel
      .findOneAndUpdate(
        { _id: this.reviewedAdvert.id },
        { $push: { reviews: this } },
        { new: true, useFindAndModify: false },
      )
      .exec();
    next();
  } catch (error) {
    logger.error(`Failed updating advert corresponding to review ${this.id}`);
  }
  next();
});
const reviewModel = mongoose.model('Review', reviewSchema, 'reviews');
export default reviewModel;
