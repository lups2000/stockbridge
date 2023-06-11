import { Router } from 'express';
import {
  deleteReview,
  getReview,
  getReviews,
  postReview,
  putReview,
} from '../controllers/reviewController';

export const reviewRouter = Router();

reviewRouter.route('/').post(postReview).get(getReviews);

reviewRouter.route('/:id').get(getReview).put(putReview).delete(deleteReview);
