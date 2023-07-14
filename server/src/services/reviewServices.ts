import reviewModel from '../models/Review';
import type { Review } from '../entities/reviewEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';
// import { deleteReviewFromAdvert } from './advertServices';

const serviceName = 'reviewServices';

/**
 * Find a review by id
 * @param id
 * @param populate determines if the result should be populated
 * @returns Promise containing the review
 */
export const findReviewById = async (id: string, populate = true) => {
  logger.debug(`${serviceName}: Finding review with id: ${id}`);
  const review = await populateResult(reviewModel.findById(id), populate);

  if (!review) {
    logger.error(`${serviceName}: Review not found with id of ${id}`);
    throw new AppError('Review not found', 'Review not found', 404);
  }
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
  // const review = (await findReviewById(id, false)) as Review;
  // await deleteReviewFromAdvert(review.reviewer as unknown as string, id);
  return reviewModel.findByIdAndDelete(id);
};

/**
 * Returns all reviews of the requested advert
 * @param advertId
 * @param populate determines if the result should be populated
 * @returns Promise containing the list of adverts
 */
export const getReviewsByAdvert = async (advertId: string, populate = true) => {
  logger.debug(
    `${serviceName}: Requesting all reviews for advert: ${advertId}`,
  );
  return await populateResult(
    reviewModel.find({ reviewedAdvert: advertId }),
    populate,
  );
};

/**
 * Returns all reviews of the requested user
 * @param store
 * @returns Promise containing the list of reviews
 */
export const getReviewsByReviewee = async (store: string, populate = true) => {
  logger.debug(`${serviceName}: Requesting all reviews for user: ${store}`);
  return await populateResult(reviewModel.find({ reviewee: store }), populate);
};

/**
 * Populates the referenced elements in a document
 * @param queryResult The document to be populated
 * @param populate Determines if the result should be populated
 * @returns
 */
function populateResult(queryResult: any, populate: boolean) {
  return populate
    ? queryResult.populate(['reviewer', 'reviewedAdvert', 'reviewee'])
    : queryResult;
}
