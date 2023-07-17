import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findAdvertById,
  createAdvert,
  updateAdvert,
  delAdvert,
  findAllAdverts,
  getAdvertsByCategory,
  getPopularCategories as getPopularCategoriesService,
  getPopularAdverts as getPopularAdvertsService,
  getAdvertsByStore,
} from '../services/advertServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Advert, AdvertStatus, ProductCategory } from '../entities/advertEntity';
import { ObjectId } from 'mongodb';
import { AppError } from '../utils/errorHandler';

/**
 * This method returns an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns an advert object.
 */
export const getAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const advert = await findAdvertById(id);
    res.status(200).json(advert);
  },
);

/**
 * This method returns all adverts
 * @param req - The request object
 * @param res - The response object
 * @returns an array of advert objects.
 */
export const getAdverts = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const reqQuery = { ...req.query };

    ['q', 'sort', 'page', 'limit', 'radius'].forEach( //change search->q
      (param) => delete reqQuery[param],
    );

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    let sortBy: string[] = [];
    let page = 1;
    let limit = 25;
    let search;
    let radius = 0;
    if (req.query.sort) {
      sortBy = (req.query.sort as string).split(',');
    }
    if (req.query.page) {
      page = parseInt(req.query.page as string);
    }
    if (req.query.limit) {
      limit = parseInt(req.query.limit as string);
    }
    if (req.query.q) { // change search -> q
      search = req.query.q as string; // change search -> q
    }
    if (req.query.radius) {
      radius = parseInt(req.query.radius as string);
    }

    const results = await findAllAdverts(
      page,
      limit,
      search,
      sortBy,
      radius === 0 ? undefined : radius,
      radius === 0 ? undefined : req.user?.location?.coordinates,
      queryStr,
    );

    res.status(200).json(results);
  },
);

/**
 * This method creates a new advert. * TODO: This method should be removed later
 * @param req - The request object
 * @param res - The response object
 * @returns created advert object.
 */
export const postAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const advert = await createAdvert(req.body);
    res.status(201).json(advert);
  },
);

/**
 * This method updates an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated advert object.
 */
export const putAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await _checkUserCanEditOrDeleteAdvert(req);
    const advert = await updateAdvert(id, req.body);
    res.status(200).json(advert);
  },
);

/**
 * This method deletes an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted advert object.
 */
export const deleteAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await _checkUserCanEditOrDeleteAdvert(req);
    const advert = await delAdvert(id);
    res.status(204).json(advert);
  },
);

/**
 * This method gets all adverts of a specific category   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted advert object.
 */
export const getAllAdvertsByCategory = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { category } = req.params;
    const adverts = await getAdvertsByCategory(category as ProductCategory);
    res.status(200).json(adverts);
  },
);

export const getCategoriesByStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { store } = req.params;
    const adverts: Advert[] = await getAdvertsByStore(store);
    const categories = adverts.map((advert) => advert.category);
    res.status(200).json(categories);
  },
);

export const prioritizeAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { advert } = req.params;
    const fetchedAdvert = await findAdvertById(advert, false);
    fetchedAdvert.prioritized = true;
    const updatedAdvert = await updateAdvert(advert, fetchedAdvert);
    res.status(200).json(updatedAdvert);
  },
);
/**
 * This method gets all adverts of a specific store   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted advert object.
 */
export const getAllAdvertsByStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { store } = req.params;
    const adverts = await getAdvertsByStore(store);
    res.status(200).json(adverts);
  },
);

/**
 * This method get the most popular categories (number specified as query param)
 *
 * @param req - The request object
 * @param res - The response object
 *
 * @returns an array of strings containing the most popular categories
 */
export const getPopularCategories = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
    const categories = await getPopularCategoriesService(limit);
    res.status(200).json({ categories });
  },
);

export const getPopularAdverts = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const adverts = await getPopularAdvertsService(limit);
    const results = [] as Advert[];
    for (const advert of adverts) {
      results.push(await findAdvertById(advert._id));
    }
    res.status(200).json({ results });
  },
);



/**
 * Checks if a user can edit or delete an advert with a given id.
 * @param req The request containing the to be checked ids.
 */
async function _checkUserCanEditOrDeleteAdvert(req: AuthenticatedRequest) {
  let userId = new ObjectId(req.user?.id);
  const { id } = req.params;
  const advert = await findAdvertById(id, false)
  // The user editing or deleting must be the one who created the advert.
  if (!advert.store.equals(userId)) {
    throw new AppError(
      'Not authorized to edit this route',
      'Not authorized to edit this route',
      401,
    );
  }
  if (advert.status !== AdvertStatus.Ongoing) {
    throw new AppError(
      'Not authorized to edit this advert',
      'Not authorized to edit this advert',
      600,
    );
  }
}
