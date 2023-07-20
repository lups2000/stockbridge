import { type Response } from 'express';
import { User } from '../entities/userEntity';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { findUserById } from '../services/userServices';
import asyncHandler from 'express-async-handler';
import logger from '../config/logger';
/**
 * This method returns a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns the public information of a user object.
 */
export const getStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    let user = (await findUserById(id)) as User;
    res.status(200).json({
      _id: user.id,
      name: user.name,
      address: user.address,
      rating: user.rating,
      email: user.email,
      createdAt: user.createdAt,
      phoneNumber: user.phoneNumber,
    });
  },
);
