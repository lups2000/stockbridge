import mongoose, { Model } from 'mongoose';
import { Review } from '../entities/reviewEntity';
import userModel from './User';
import { User } from '../entities/userEntity';
import advertModel from './Advert';
import { Advert } from '../entities/advertEntity';

const Types = mongoose.Schema.Types;

interface ReviewModel extends Model<Review> {
  getAverageRating(revieweeId: string): Promise<[number, number]>;
}

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
    required: [true, 'Please add a creation date'],
    default: Date.now,
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

// reviewSchema.pre<Review>('save', async function (next) {
//   try {
//     await advertModel
//       .findOneAndUpdate(
//         { _id: this.reviewedAdvert.id },
//         { $push: { reviews: this } },
//         { new: true, useFindAndModify: false },
//       )
//       .exec();
//     next();
//   } catch (error) {
//     logger.error(`Failed updating advert corresponding to review ${this.id}`);
//   }
//   next();
// });
// Static method to get avg rating and save

reviewSchema.static(
  'getAverageRating',
  async function (revieweeId: string): Promise<[number, number]> {
    const obj = await this.aggregate([
      {
        $lookup: {
          from: 'adverts',
          localField: 'reviewedAdvert',
          foreignField: '_id',
          as: 'reviewedAdvert',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$reviewedAdvert', 0] }, '$$ROOT'],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'reviewedAdvert.store',
          foreignField: '_id',
          as: 'reviewee',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$reviewee', 0] }, '$$ROOT'],
          },
        },
      },
      {
        $group: {
          _id: '$reviewee._id',
          averageRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
      {
        $match: { _id: revieweeId },
      },
    ]);
    return [obj[0].averageRating, obj[0].count];
  },
);

// Call getAverageCost before save
reviewSchema.post('save', async function () {
  const advert = (await advertModel.findById(this.reviewedAdvert)) as Advert;
  const rating = await reviewModel.getAverageRating(
    advert.store as unknown as string,
  );
  // const newRating =
  //   (prevRating[0] * prevRating[1] + this.rating) / (prevRating[1] + 1);
  await userModel.findByIdAndUpdate(advert.store, {
    rating: rating[0],
  });
});

reviewSchema.pre('save', async function () {
  await advertModel.findByIdAndUpdate(this.reviewedAdvert, {
    $push: { reviews: this._id },
  });
});

// Call getAverageCost before remove
reviewSchema.pre('findOneAndDelete', async function () {
  const query = this.getQuery();

  const review = (await reviewModel.findById(query._id)) as Review;

  const advert = (await advertModel.findById(review.reviewedAdvert)) as Advert;
  const rating = await reviewModel.getAverageRating(
    advert.store as unknown as string,
  );

  const newRating = (rating[0] * rating[1] - review.rating) / (rating[1] - 1);
  await userModel.findByIdAndUpdate(advert.store, {
    rating: newRating,
  });
});

reviewSchema.pre('findOneAndDelete', async function () {
  const query = this.getQuery();

  const review = (await reviewModel.findById(query._id)) as Review;

  await advertModel.findByIdAndUpdate(review.reviewedAdvert, {
    $pull: { reviews: review.id },
  });
});

// Prevent user from submitting more than one review per bootcamp
reviewSchema.index({ reviewedAdvert: 1, reviewer: 1 }, { unique: true });

const reviewModel = mongoose.model<Review, ReviewModel>(
  'Review',
  reviewSchema,
  'reviews',
);

export default reviewModel;
