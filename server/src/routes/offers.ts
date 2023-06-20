import { Router } from 'express';
import {
  deleteOffer,
  getOffer,
  getOffers,
  getOffersByAdvert,
  getOffersByOfferee,
  getOffersByOfferor,
  postOffer,
  putOffer,
} from '../controllers/offerController';
import { protect } from '../middlewares/authMiddleware';

export const offerRouter = Router();

offerRouter.route('/').post(protect, postOffer).get(protect, getOffers);

offerRouter.route('/:id').get(protect, getOffer).put(protect, putOffer).delete(protect, deleteOffer);

offerRouter.route('/getOffersByAdvert/:advert').get(protect, getOffersByAdvert);

offerRouter.route('/getOffersByOfferor/:offeror').get(protect, getOffersByOfferor);

offerRouter.route('/getOffersByOfferee/:offeree').get(protect, getOffersByOfferee);
