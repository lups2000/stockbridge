import { Router } from 'express';
import {
  deleteAdvert,
  getAdvert,
  getAdverts,
  getAllAdvertsByCategory,
  getPopularAdverts,
  getPopularCategories,
  getAllAdvertsByStore,
  postAdvert,
  putAdvert,
} from '../controllers/advertController';
import { protect } from '../middlewares/authMiddleware';

export const advertRouter = Router();

advertRouter.route('/').post(protect, postAdvert).get(protect, getAdverts);
advertRouter
  .route('/getAdvertsByCategory/:cat')
  .get(protect, getAllAdvertsByCategory);
advertRouter.route('/getPopularCategories').get(protect, getPopularCategories);
advertRouter.route('/getPopularAdverts').get(protect, getPopularAdverts);

advertRouter
  .route('/:id')
  .get(protect, getAdvert)
  .put(protect, putAdvert)
  .delete(protect, deleteAdvert);

advertRouter
  .route('/getAdvertsByCategory/:category')
  .get(protect, getAllAdvertsByCategory);

advertRouter
  .route('/getAdvertsByStore/:store')
  .get(protect, getAllAdvertsByStore);

advertRouter
  .route('/getAdvertsByStore/:store')
  .get(protect, getAllAdvertsByStore);
