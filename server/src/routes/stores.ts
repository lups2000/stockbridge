import { Router } from 'express';
import { getStore } from '../controllers/storeController';
import { protect } from '../middlewares/authMiddleware';

export const storeRouter = Router();

storeRouter.route('/:id').get(protect, getStore);

export default storeRouter;
