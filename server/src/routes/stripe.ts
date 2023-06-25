import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  cancelSubscription,
  createPaymentIntent,
  createSetupIntent,
  createSubscription,
  InvoiceLink,
  webhook,
} from '../controllers/stripeController';
import bodyParser from 'body-parser';

export const stripeRouter = Router();

stripeRouter.route('/create-payment-intent').post(protect, createPaymentIntent);
stripeRouter.route('/create-setup-intent').get(protect, createSetupIntent);
stripeRouter.route('/create-subscription').post(protect, createSubscription);
stripeRouter.route('/cancel-subscription').delete(protect, cancelSubscription);
stripeRouter.route('/get-invoice-link').get(protect, InvoiceLink);
stripeRouter
  .route('/webhook')
  .post(bodyParser.raw({ type: 'application/json' }), webhook);
export default stripeRouter;
