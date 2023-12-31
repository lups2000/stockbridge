import { Router } from 'express';
import {
  acceptOffer,
  cancelOffer,
  deleteOffer,
  getOffer,
  getOffers,
  getOffersByAdvert,
  getOffersByOfferee,
  getOffersByOfferor,
  getUserSpecificOffers,
  postOffer,
  putOffer,
  rejectOffer,
} from '../controllers/offerController';
import { protect } from '../middlewares/authMiddleware';

export const offerRouter = Router();

offerRouter.route('/').post(protect, postOffer).get(protect, getOffers);

offerRouter
  .route('/getOffersByOfferor/:offeror')
  .get(protect, getOffersByOfferor);

offerRouter
  .route('/getOffersByOfferee/:offeree')
  .get(protect, getOffersByOfferee);

offerRouter.route('/getUserSpecificOffers').get(protect, getUserSpecificOffers);

offerRouter.route('/getOffersByAdvert/:advert').get(protect, getOffersByAdvert);
offerRouter.route('/rejectOffer/:user').put(protect, rejectOffer);
offerRouter.route('/acceptOffer/:user').put(protect, acceptOffer);
offerRouter.route('/cancelOffer/:user').put(protect, cancelOffer);
offerRouter
  .route('/:id')
  .get(protect, getOffer)
  .put(protect, putOffer)
  .delete(protect, deleteOffer);
