import { Router } from 'express';
import {
  deleteReview,
  getAllReviewsByAdvert,
  getReview,
  postReview,
  putReview,
} from '../controllers/reviewController';
import { protect } from '../middlewares/authMiddleware';

export const reviewRouter = Router();

reviewRouter.route('/').post(protect, postReview);

reviewRouter
  .route('/:id')
  .get(protect, getReview)
  .put(protect, putReview)
  .delete(protect, deleteReview);
reviewRouter
  .route('/getReviewsByAdvert/:advertId')
  .get(protect, getAllReviewsByAdvert);
