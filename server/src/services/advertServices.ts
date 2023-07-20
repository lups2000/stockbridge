import advertModel from '../models/Advert';
import type { Advert, ProductCategory } from '../entities/advertEntity';
import { AdvertStatus } from '../entities/advertEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';
import {
  SubscriptionStatus,
  SubscriptionType,
  User,
} from '../entities/userEntity';

const serviceName = 'advertServices';

/**
 * Find an advert by id
 * @param id
 * @param populate determines if the result should be populated
 * @param hide hides details about the advert from non logged in users
 * @returns Promise containing the advert
 */
export const findAdvertById = async (
  id: string,
  populate = true,
  hide = false,
): Promise<Advert> => {
  logger.debug(`${serviceName}: Finding advert with id: ${id}`);
  let query = hide
    ? advertModel
        .findById(id)
        .select(
          'productname prioritized quantity description price imageurl createdAt category',
        )
    : advertModel.findById(id);
  const advert = await populateResult(query, populate);

  if (!advert) {
    logger.error(`${serviceName}: Advert not found with id of ${id}`);
    throw new AppError('Advert not found', 'Advert not found', 404);
  }

  logger.debug(`${serviceName}: Returning advert with id ${advert._id}`);
  return advert;
};

/**
 * create an advert
 * @param advert
 * @param user
 * @returns Promise containing the advert
 */
export const createAdvert = async (advert: Advert, user: User) => {
  logger.debug(`${serviceName}: Creating advert ${advert.productname}`);

  // Get count of adverts from the last week
  const count = await advertModel.countDocuments({
    createdAt: {
      $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    },
    store: user.id,
    status: AdvertStatus.Ongoing,
  });

  logger.debug(`${serviceName}: Count of adverts from the last week: ${count}`);

  let advertLimit = 3;
  if (
    user.subscription &&
    user.subscription.status === SubscriptionStatus.ACTIVE
  ) {
    switch (user.subscription.type) {
      case SubscriptionType.BASIC_SUBSCRIPTION:
        advertLimit = 10;
        break;
      case SubscriptionType.ADVANCED_SUBSCRIPTION:
        advertLimit = 15;
        break;
      case SubscriptionType.PREMIUM_SUBSCRIPTION:
        advertLimit = Number.MAX_SAFE_INTEGER;
        break;
      default:
        advertLimit = 3;
    }
  }

  if (count >= advertLimit) {
    logger.error(`${serviceName}: Advert limit reached for user ${user.id}`);
    throw new AppError(
      `Advert limit reached`,
      `Advert limit reachedAdvert limit of ${advertLimit} reached`,
      403,
    );
  }

  return await advertModel.create(advert);
};

/**
 * Update an advert
 * @param id
 * @param advert
 * @returns Promise containing the updated advert
 */
export const updateAdvert = async (id: string, advert: Advert) => {
  logger.debug(`${serviceName}: Updating advert with id: ${id} `);
  return advertModel.findOneAndUpdate({ _id: id }, advert, {
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
 * Close an advert
 * @param id - The ID of the advert to cancel
 * @returns Promise containing the closed advert
 */
export const closeAdvertService = async (id: string) => {
  logger.debug(`${serviceName}: Close advert with id: ${id}`);
  const updatedAdvert = await advertModel.findOneAndUpdate(
    { _id: id },
    { status: 'Closed' }, // Set the new status -> canceled
    { new: true, runValidators: true },
  );
  return updatedAdvert;
};

/**
 * Find all adverts
 * @param page page number
 * @param limit number of items per page
 * @param search search string
 * @param sortBy sort string
 * @param radius radius in km
 * @param center center of the search area
 * @param queryStr query string
 * @param populate determines if the result should be populated
 * @param isUserLogged determines if the user is logged in
 * @returns Promise containing all adverts
 */

export const findAllAdverts = async (
  page: number,
  limit: number,
  search?: string,
  sortBy?: string[],
  radius?: number,
  center?: number[],
  queryStr?: string,
  populate = false,
  isUserLogged = false,
) => {
  logger.debug(`${serviceName}: Finding all adverts with pagination`);
  logger.debug(`${serviceName}: Query string: ${queryStr}`);
  logger.debug(`${serviceName}: Sort string: ${sortBy}`);
  logger.debug(`${serviceName}: Page: ${page}`);
  logger.debug(`${serviceName}: Limit: ${limit}`);
  logger.debug(`${serviceName}: Search: ${search}`);
  logger.debug(`${serviceName}: Radius: ${radius}`);
  logger.debug(`${serviceName}: Center: ${center}`);

  let queryFilter = queryStr ? JSON.parse(queryStr) : {};

  if (queryFilter?.category && queryFilter?.category.$in) {
    queryFilter = {
      ...queryFilter,
      category: { $in: queryFilter.category.$in.split(',') },
    };
  }

  /*if (search) {
    queryFilter = {
      ...queryFilter,
      $text: { $search: search },
    };
  }*/

  if (search) {
    const regex = new RegExp(search, 'i'); //The "i" stands for case-insensitive matching.
    queryFilter = {
      ...queryFilter,
      $or: [
        { description: { $regex: regex } },
        { productname: { $regex: regex } },
      ],
    };
  }

  if (radius) {
    queryFilter = {
      ...queryFilter,
      location: {
        $geoWithin: {
          $centerSphere: [center, radius / 6371],
        },
      },
    };
  }

  //filter the adverts that are not closed
  queryFilter = {
    ...queryFilter,
    status: { $ne: 'Closed' },
  };

  logger.debug(`${serviceName}: Query filter: ${JSON.stringify(queryFilter)}`);

  let query = advertModel.find(queryFilter);

  query = populateResult(query, populate);

  if (sortBy && sortBy?.length > 0) {
    let sortParams: [string, -1 | 1][] = [['prioritized', -1]];
    let isCreatedAtIncluded = false;

    for (const sortParam of sortBy) {
      let data: [string, -1 | 1];
      if (sortParam.startsWith('-')) {
        const key = sortParam.slice(1);
        isCreatedAtIncluded = key === 'createdAt';
        data = [key, -1];
      } else {
        isCreatedAtIncluded = sortParam === 'createdAt';
        data = [sortParam, 1];
      }
      sortParams.push(data);
    }
    if (!isCreatedAtIncluded) {
      sortParams.push(['createdAt', -1]);
    }
    sortParams.push(['_id', -1]);
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
  const total = await advertModel.countDocuments(queryFilter);

  query = query.skip(startIndex).limit(limit);
  // Selects the fields that can be displayed for all users
  if (!isUserLogged) {
    query = query.select(
      'productname prioritized quantity description status price imageurl createdAt category',
    );
  }

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
  //  return await populateResult(advertModel.find(), populate);
  return { results, pagination, totalNumberOfPages: Math.ceil(total / limit) };
};

/**
 * Returns all adverts of the requested category
 * @param category
 * @param populate determines if the result should be populated
 * @returns Promise containing the related adverts.
 */
export const getAdvertsByCategory = async (
  category: ProductCategory,
  populate = true,
) => {
  logger.debug(
    `${serviceName}: Requesting all adverts with category: ${category}`,
  );
  return await populateResult(
    advertModel
      .find({ category: category })
      .select(
        'productname prioritized quantity status description price imageurl createdAt category location',
      ),
    populate,
  );
};

/**
 * Returns all adverts of the requested store
 * @param store
 * @param populate
 * @returns Promise containing the related adverts.
 */
export const getAdvertsByStore = async (store: string, populate = true) => {
  logger.debug(`${serviceName}: Requesting all adverts of store: ${store}`);
  return await populateResult(advertModel.find({ store: store }), populate);
};

/**
 * Returns popular categories
 *
 * @param limit - number of categories to return
 *
 * @returns Promise containing the most popular categories
 */

export const getPopularCategories = async (limit: number) => {
  logger.debug(`${serviceName}: Requesting most popular categories`);
  return advertModel.aggregate([
    { $match: { status: 'Ongoing' } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: limit },
  ]);
};

/**
 * Retrieves the advert Ids of the top "limit" (as number) ads of each category.
 * @param limit
 * @returns
 */
export const getPopularAdverts = async (limit: number) => {
  logger.debug(`${serviceName}: Requesting most popular adverts`);
  return advertModel.aggregate([
    { $match: { status: 'Ongoing' } },
    { $unwind: '$offers' },
    {
      $group: {
        _id: '$_id',
        size: { $sum: 1 },
      },
    },
    { $sort: { size: -1 } },
    { $limit: limit },
  ]);
};

/**
 * Populates the referenced elements in a document
 * @param queryResult The document to be populated
 * @param populate Determines if the result should be populated
 * @returns
 */
function populateResult(queryResult: any, populate: boolean) {
  return populate
    ? queryResult.populate(['reviews', 'store', 'offers'])
    : queryResult;
}
