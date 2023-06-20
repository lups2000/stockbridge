import { type Response, Router } from 'express';
import { User } from '../entities/userEntity';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { findUserById, updateUser } from '../services/userServices';
import asyncHandler from 'express-async-handler';
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
    });
  },
);

/**
 * This method updates a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated user object.
 */
export const putStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updateContent = {
      rating: req.body.rating,
    } as User;
    const user = await updateUser(id, updateContent);
    res.status(200).json(user);
  },
);
