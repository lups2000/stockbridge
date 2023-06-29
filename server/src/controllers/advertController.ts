import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findAdvertById,
  createAdvert,
  updateAdvert,
  delAdvert,
  findAllAdverts,
  getAdvertsByCategory,
  getAdvertsByStore,
} from '../services/advertServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { ProductCategory } from '../entities/advertEntity';

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
 * This method returns all adverts   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of advert objects.
 */
export const getAdverts = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const adverts = await findAllAdverts();
    res.status(200).json(adverts);
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
    const newAdvert = req.body;
    const existingAdvert = await findAdvertById(id);
    if (newAdvert.reviews) {
      newAdvert.reviews = (existingAdvert.reviews || []).concat(
        newAdvert.reviews,
      );
    }

    if (newAdvert.offers) {
      newAdvert.offers = (existingAdvert.offers || []).concat(newAdvert.offers);
    }
    const advert = await updateAdvert(id, newAdvert);
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

/**
 * This method gets all adverts of a specific store   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted advert object.
 */
export const getAllAdvertsByStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { store } = req.params;;
    const adverts = await getAdvertsByStore(store);
    res.status(200).json(adverts);
  }
);
