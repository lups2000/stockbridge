import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findReviewById,
  createReview,
  updateReview,
  delReview,
  getReviewsByAdvert,
} from '../services/reviewServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';

/**
 * This method returns a review by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns a review object.
 */
export const getReview = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const review = await findReviewById(id);
    res.status(200).json(review);
  },
);

/**
 * This method creates a new review. * TODO: This method should be removed later
 * @param req - The request object
 * @param res - The response object
 * @returns created review object.
 */
export const postReview = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const review = await createReview(req.body);
    res.status(201).json(review);
  },
);

/**
 * This method updates a review by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated review object.
 */
export const putReview = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    /* if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    } */

    const review = await updateReview(id, req.body);
    res.status(200).json(review);
  },
);

/**
 * This method deletes a review by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted review object.
 */
export const deleteReview = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    /* if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    } */

    const review = await delReview(id);
    res.status(204).json(review);
  },
);

/**
 * This method gets all reviews of a specific advert   *
 * @param req - The request object
 * @param res - The response object
 * @returns list of reviews.
 */
export const getAllReviewsByAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { advertId } = req.params;
    const reviews = await getReviewsByAdvert(advertId);
    res.status(200).json(reviews);
  },
);
