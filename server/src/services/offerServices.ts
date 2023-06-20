import offerModel from '../models/Offer';
import type { Offer } from '../entities/offerEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';

const serviceName = 'offerServices';

/**
 * Finds an offer by id.
 * @param id
 * @returns Promise containing the offer
 */
export const findOfferById = async (id: string) => {
  logger.debug(`${serviceName}: Finding offer with id: ${id}`);
  const offer = await offerModel.findById(id);

  if (!offer) {
    logger.error(`${serviceName}: Offer not found with id of ${id}`);
    throw new AppError('Offer not found', 'Offer not found', 404);
  }

  logger.debug(`${serviceName}: Returning offer ${offer}`);
  return offer;
};

/**
 * Creates an offer.
 * @param offer
 * @returns Promise containing the offer
 */
export const createOffer = async (offer: Offer) => {
  logger.debug(`${serviceName}: Creating offer ${offer.id}`);
  return await offerModel.create(offer);
};

/**
 * Updates an offer.
 * @param id
 * @param offer
 * @returns Promise containing the updated offer
 */
export const updateOffer = async (id: string, offer: Offer) => {
  logger.debug(`${serviceName}: Updating offer with id: ${id} with ${offer}`);
  return offerModel.findByIdAndUpdate(id, offer, {
    new: true,
    runValidators: true,
  });
};

/**
 * Deletes an offer.
 * @param id
 * @returns Promise containing the deleted offer
 */
export const delOffer = async (id: string) => {
  logger.debug(`${serviceName}: Deleting offer with id: ${id}`);
  return offerModel.findByIdAndDelete(id);
};

/**
 * Finds all offers -- Used only for debugging.
 * @returns Promise containing all offers
 */
export const findAllOffers = async () => {
  logger.debug(`${serviceName}: Finding all offers`);
  return offerModel.find();
};

/**
 * Returns all suggested offers of a user.
 * @param offeror : Id of the offeror
 * @returns Promise containing the deleted advert.
 */
export const findAllOffersByOfferor = async (offeror: string) => {
  logger.debug(`${serviceName}: Requesting all offers of offeror: ${offeror}`);
  return offerModel.find({ offeror: offeror });
};

/**
 * Returns all received offers of a user.
 * @param offeree : Id of the offeree
 * @returns Promise containing the deleted advert.
 */
export const findAllOffersByOfferee = async (offeree: string) => {
  logger.debug(`${serviceName}: Requesting all offers of offeree: ${offeree}`);
  return offerModel.find({ offeree: offeree });
};

/**
 * Returns all offers related to an advert.
 * @param advert : Id of the advert
 * @returns Promise containing the deleted advert.
 */
export const findAllOffersByAdvert = async (advert: string) => {
  logger.debug(
    `${serviceName}: Requesting all offers related to advert: ${advert}`,
  );
  return offerModel.find({ advert: advert });
};
