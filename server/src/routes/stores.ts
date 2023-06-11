import { Router } from 'express';
import { getStoreData } from '../controllers/userController';

export const storeRouter = Router();

storeRouter.route('/:id').get(getStoreData);

export default storeRouter;
