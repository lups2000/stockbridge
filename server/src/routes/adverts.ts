import { Router } from 'express';
import {
  deleteAdvert,
  getAdvert,
  getAdverts,
  getAllAdvertsByCategory,
  postAdvert,
  putAdvert,
} from '../controllers/advertController';

export const advertRouter = Router();

advertRouter.route('/').post(postAdvert).get(getAdverts);

advertRouter.route('/:id').get(getAdvert).put(putAdvert).delete(deleteAdvert);

advertRouter.route('/getAdvertsByCategory/:cat').get(getAllAdvertsByCategory);
