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
  getCategoriesByStore,
  prioritizeAdvert,
} from '../controllers/advertController';
import { protect, setUserIfAvailable } from '../middlewares/authMiddleware';

export const advertRouter = Router();

advertRouter
  .route('/')
  .post(protect, postAdvert)
  .get(setUserIfAvailable, getAdverts);
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
  .route('/getCategoriesByStore/:store')
  .get(protect, getCategoriesByStore);


advertRouter.route('/prioritizeAdvert/:advert').get(protect, prioritizeAdvert);
