import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  postUser,
  getUsers,
  getUser,
  putUser,
  deleteUser,
} from '../controllers/userController';

export const userRouter = Router();

userRouter
  .route('/')
  .post(protect, postUser)
  .get(protect, getUsers);

userRouter
  .route('/:id')
  .get(protect, getUser)
  .put(protect, putUser)
  .delete(protect, deleteUser);

export default userRouter;
