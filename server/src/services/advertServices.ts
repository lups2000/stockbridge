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

export const findAllAdverts = async (
  page: number,
  limit: number,
  search?: string,
  sortBy?: string[],
  queryStr?: string,
) => {
  logger.debug(`${serviceName}: Finding all adverts with pagination`);
  logger.debug(`${serviceName}: Query string: ${queryStr}`);
  logger.debug(`${serviceName}: Sort string: ${sortBy}`);
  logger.debug(`${serviceName}: Page: ${page}`);
  logger.debug(`${serviceName}: Limit: ${limit}`);
  logger.debug(`${serviceName}: Search: ${search}`);

  let queryFilter = queryStr ? JSON.parse(queryStr) : {};

  if (queryFilter?.category && queryFilter?.category.$in) {
    queryFilter = {
      ...queryFilter,
      category: { $in: queryFilter.category.$in.split(',') },
    };
  }

  if (search) {
    queryFilter = {
      ...queryFilter,
      $text: { $search: search },
    };
  }

  logger.debug(`${serviceName}: Query filter: ${JSON.stringify(queryFilter)}`);

  let query = advertModel.find(queryFilter);

  if (sortBy && sortBy?.length > 0) {
    let sortParams: [string, -1 | 1][] = [['prioritized', -1]];

    for (const sortParam of sortBy) {
      let data: [string, -1 | 1];
      if (sortParam.startsWith('-')) {
        const key = sortParam.slice(1);
        data = [key, -1];
      } else {
        data = [sortParam, 1];
      }
      sortParams.push(data);
    }
    sortParams = [...sortParams, ['createdAt', -1], ['_id', -1]];
    query = query.sort(sortParams);
  } else {
    logger.debug(`${serviceName}: No sort params, using default`);
    query = query.sort({
      prioritized: -1,
      createdAt: -1,
      _id: -1,
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await advertModel.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const results = await query;

  const pagination: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  } = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  return { results, pagination };
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
