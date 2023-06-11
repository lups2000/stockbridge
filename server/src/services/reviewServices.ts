import reviewModel from '../models/Review';
import type { Review } from '../entities/reviewEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';

const serviceName = 'reviewServices';

/**
 * Find a review by id
 * @param id
 * @returns Promise containing the review
 */
export const findReviewById = async (id: string) => {
  logger.debug(`${serviceName}: Finding review with id: ${id}`);
  const review = await reviewModel.findById(id);

  if (!review) {
    logger.error(`${serviceName}: Review not found with id of ${id}`);
    throw new AppError('Review not found', 'Review not found', 404);
  }

  logger.debug(`${serviceName}: Returning review ${review}`);
  return review;
};

/**
 * create a review
 * @param review
 * @returns Promise containing the review
 */
export const createReview = async (review: Review) => {
  logger.debug(`${serviceName}: Creating review ${review}`);
  return await reviewModel.create(review);
};

/**
 * Update a review
 * @param id
 * @param review
 * @returns Promise containing the updated review
 */
export const updateReview = async (id: string, review: Review) => {
  logger.debug(`${serviceName}: Updating review with id: ${id} with ${review}`);
  return reviewModel.findByIdAndUpdate(id, review, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete a review
 * @param id
 * @returns Promise containing the deleted review
 */
export const delReview = async (id: string) => {
  logger.debug(`${serviceName}: Deleting review with id: ${id}`);
  return reviewModel.findByIdAndDelete(id);
};

/**
 * Find all reviews // TODO: This is a test function, remove it later
 * @returns Promise containing all reviews
 */
export const findAllReviews = async () => {
  logger.debug(`${serviceName}: Finding all reviews`);
  return reviewModel.find();
};
