import { type Response, Router } from "express";
import asyncHandler from "express-async-handler";
import logger from "../config/logger";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {
  findAdvertById,
  createAdvert,
  updateAdvert,
  delAdvert,
  findAllAdverts,
} from "../services/advertServices";

/**
 * This method returns an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns a user object.
 */
const getAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    logger.info(`Getting advert with id ${id}`);
    const advert = await findAdvertById(id);
    if (advert) {
      res.status(200).json(advert);
    } else {
      logger.error(`Could not get advert with id ${id}`);
      res.status(400);
    }
  }
);

/**
 * This method returns all adverts   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of user objects.
 */
const getAdverts = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const adverts = await findAllAdverts();
    res.status(200).json(adverts);
  }
);

/**
 * This method creates a new advert.
 * @param req - The request object
 * @param res - The response object
 * @returns created user object.
 */
const postAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const advert = await createAdvert(req.body);
    logger.info("Created new advert with id ", advert.id);
    res.status(201).json(advert);
  }
);

/**
 * This method updates an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated user object.
 */
const putAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const advert = await updateAdvert(id, req.body);
    res.status(200).json(advert);
  }
);

/**
 * This method deletes an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted user object.
 */
const deleteAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const advert = await delAdvert(id);
    res.status(204).json(advert);
  }
);

export const advertRouter = Router();

advertRouter.route("/").post(postAdvert).get(getAdverts);

advertRouter.route("/:id").get(getAdvert).put(putAdvert).delete(deleteAdvert);
