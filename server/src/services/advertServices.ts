import advertModel from '../models/Advert';
import type { Advert, ProductCategory } from '../entities/advertEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';

const serviceName = 'advertServices';

/**
 * Find an advert by id
 * @param id
 * @returns Promise containing the advert
 */
export const findAdvertById = async (id: string) => {
  logger.debug(`${serviceName}: Finding advert with id: ${id}`);
  const advert = await advertModel.findById(id);

  if (!advert) {
    logger.error(`${serviceName}: Advert not found with id of ${id}`);
    throw new AppError('Advert not found', 'Advert not found', 404);
  }

  logger.debug(`${serviceName}: Returning advert ${advert}`);
  return advert;
};

/**
 * create an advert
 * @param advert
 * @returns Promise containing the advert
 */
export const createAdvert = async (advert: Advert) => {
  logger.debug(`${serviceName}: Creating advert ${advert.productname}`);
  return await advertModel.create(advert);
};

/**
 * Update an advert
 * @param id
 * @param advert
 * @returns Promise containing the updated advert
 */
export const updateAdvert = async (id: string, advert: Advert) => {
  logger.debug(`${serviceName}: Updating advert with id: ${id} with ${advert}`);
  return advertModel.findByIdAndUpdate(id, advert, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete an advert
 * @param id
 * @returns Promise containing the deleted advert
 */
export const delAdvert = async (id: string) => {
  logger.debug(`${serviceName}: Deleting advert with id: ${id}`);
  return advertModel.findByIdAndDelete(id);
};

/**
 * Find all adverts // TODO: This is a test function, remove it later // Why remove? copy paste mistake?
 * @returns Promise containing all adverts
 */
export const findAllAdverts = async () => {
  logger.debug(`${serviceName}: Finding all adverts`);
  return advertModel.find();
};

/**
 * Returns all adverts of the requested category
 * @param category
 * @returns Promise containing the deleted advert.
 */
export const getAdvertsByCategory = async (category: ProductCategory) => {
  logger.debug(
    `${serviceName}: Requesting all adverts with category: ${category}`,
  );
  return advertModel.find({ category: category });
};
