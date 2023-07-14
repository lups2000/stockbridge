import offerModel from '../models/Offer';
import type { Offer } from '../entities/offerEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';

const serviceName = 'offerServices';

/**
 * Finds an offer by id.
 * @param id
 * @param populate determines if the result should be populated
 * @returns Promise containing the offer
 */
export const findOfferById = async (id: string, populate = true) => {
  logger.debug(`${serviceName}: Finding offer with id: ${id}`);
  const offer = await populateResult(offerModel.findById(id), populate);

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
  return await offerModel.findByIdAndUpdate(id, offer, {
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
  return await offerModel.findByIdAndDelete(id);
};

/**
 * Finds all offers -- Used only for debugging.
 * @param populate determines if the result should be populated
 * @returns Promise containing all offers
 */
export const findAllOffers = async (populate = true) => {
  logger.debug(`${serviceName}: Finding all offers`);
  return await populateResult(offerModel.find(), populate);
};

/**
 * Returns all suggested offers of a user.
 * @param offeror : Id of the offeror
 * @param populate determines if the result should be populated
 * @returns Promise containing the deleted advert.
 */
export const findAllOffersByOfferor = async (
  offeror: string,
  populate = true,
) => {
  logger.debug(`${serviceName}: Requesting all offers of offeror: ${offeror}`);
  return await populateResult(offerModel.find({ offeror: offeror }), populate);
};

/**
 * Returns all received offers of a user.
 * @param offeree : Id of the offeree
 * @param populate determines if the result should be populated
 * @returns Promise containing the deleted advert.
 */
export const findAllOffersByOfferee = async (
  offeree: string,
  populate = true,
) => {
  logger.debug(`${serviceName}: Requesting all offers of offeree: ${offeree}`);
  return await populateResult(offerModel.find({ offeree: offeree }), populate);
};

/**
 * Returns all offers related to an advert.
 * @param advert : Id of the advert
 * @param populate determines if the result should be populated
 * @returns Promise containing the deleted advert.
 */
export const findAllOffersByAdvert = async (
  advert: string,
  populate = true,
): Promise<Offer[]> => {
  logger.debug(
    `${serviceName}: Requesting all offers related to advert: ${advert}`,
  );
  return await populateResult(offerModel.find({ advert: advert }), populate);
};

/**
 * Populates the referenced elements in a document
 * @param queryResult The document to be populated
 * @param populate Determines if the result should be populated
 * @returns
 */
function populateResult(queryResult: any, populate: boolean) {
  return populate
    ? queryResult.populate(['offeror', 'offeree', 'advert'])
    : queryResult;
}
