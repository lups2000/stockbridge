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
  prioritizeAdvert,
} from '../controllers/advertController';
import { protect } from '../middlewares/authMiddleware';

export const advertRouter = Router();

advertRouter.route('/').post(protect, postAdvert).get(getAdverts);
advertRouter.route('/getAdvertsByCategory/:cat').get(getAllAdvertsByCategory);
advertRouter.route('/getPopularCategories').get(getPopularCategories);
advertRouter.route('/getPopularAdverts').get(getPopularAdverts);

advertRouter
  .route('/:id')
  .get(protect, getAdvert)
  .put(protect, putAdvert)
  .delete(protect, deleteAdvert);

advertRouter
  .route('/getAdvertsByStore/:store')
  .get(protect, getAllAdvertsByStore);

advertRouter
  .route('/getAdvertsByStore/:store')
  .get(protect, getAllAdvertsByStore);

advertRouter
  .route('/prioritizeAdvert/:advert')
  .get(protect, prioritizeAdvert);