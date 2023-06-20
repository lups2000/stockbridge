import { Router } from 'express';
import { getStore } from '../controllers/storeController';

export const storeRouter = Router();

storeRouter.route('/:id').get(getStore);

export default storeRouter;
