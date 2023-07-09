import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findOfferById,
  createOffer,
  updateOffer,
  delOffer,
  findAllOffers,
  findAllOffersByAdvert,
  findAllOffersByOfferor,
  findAllOffersByOfferee,
} from '../services/offerServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { ObjectId } from 'mongodb';
import { AppError } from '../utils/errorHandler';
import { Offer } from '../entities/offerEntity';
import { findAdvertById } from '../services/advertServices';
import { Advert } from '../entities/advertEntity';

/**
 * This method returns a offer by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns a offer object.
 */
export const getOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = new ObjectId(req.user?.id);

    let offer = await findOfferById(id);
    offer = _findAndCheckRelatedOffers(userId, [offer])[0];

    res.status(200).json(offer);
  },
);

/**
 * This method returns all offers   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of offer objects.
 */
export const getOffers = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = new ObjectId(req.user?.id);
    let offers = await findAllOffers();
    // Return only offers related to the user.
    offers = _findAndCheckRelatedOffers(userId, offers);

    res.status(200).json(offers);
  },
);

/**
 * This method creates a new offer.
 * @param req - The request object
 * @param res - The response object
 * @returns created offer object.
 */
export const postOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { offeror, offeree, advert } = req.body;
    const relatedAdvert = await findAdvertById(advert);
    // Type conversion for comparaison
    let offerorId = new ObjectId(offeror),
      userId = new ObjectId(relatedAdvert.store.id);
    if (offeror == offeree || offerorId.equals(userId)) {
      throw new AppError(
        'Not allowed to create offers for own adverts',
        'Not allowed to create offers for own adverts',
        400,
      );
    }
    const offer = await createOffer(req.body);
    res.status(201).json(offer);
  },
);

/**
 * This method updates a offer by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated offer object.
 */
export const putOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    _checkUserCanEditOrDeleteOffer(req);

    const offer = await updateOffer(id, req.body);
    res.status(200).json(offer);
  },
);

/**
 * This method deletes a offer by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const deleteOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    _checkUserCanEditOrDeleteOffer(req);

    const offer = await delOffer(id);
    res.status(204).json(offer);
  },
);

/**
 * This method gets all offers of an advert   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const getOffersByAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { advert } = req.params;
    const userId = new ObjectId(req.user?.id);
    let offers = await findAllOffersByAdvert(advert, true);
    offers = _findAndCheckRelatedOffers(userId, offers);
    res.status(200).json(offers);
  },
);

/**
 * This method gets all offers proposed by a user  *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const getOffersByOfferor = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { offeror } = req.params;

    const userId = req.user?.id;
    if (userId != offeror) {
      throw new AppError(
        'Not authorized to access this route',
        'Not authorized to access this route',
        401,
      );
    }

    const offers = await findAllOffersByOfferor(offeror);
    res.status(200).json(offers);
  },
);

/**
 * This method gets all offers received by a user  *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const getOffersByOfferee = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { offeree } = req.params;
    const userId = req.user?.id;
    if (userId != offeree) {
      throw new AppError(
        'Not authorized to access this route',
        'Not authorized to access this route',
        401,
      );
    }

    const offer = await findAllOffersByOfferee(offeree);
    res.status(200).json(offer);
  },
);

/**
 * This method gets all offers that match the request body parameters  *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const getUserSpecificOffers = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { user, advertType, offerType } = req.query;
    const userId = req.user?.id;

    if (userId != user) {
      throw new AppError(
        'Not authorized to access this route',
        'Not authorized to access this route',
        401,
      );
    }

    var offers: Offer[];
    switch (offerType) {
      case 'incoming': {
        offers = await findAllOffersByOfferee(user as string);
        break;
      }
      case 'outgoing': {
        offers = await findAllOffersByOfferor(user as string);
        break;
      }
      default: {
        throw new AppError('Unknown offer type', 'Unknown offer type', 400);
      }
    }

    // Forced casting for the type Advert
    offers = offers.filter(
      (x) => (x.advert as unknown as Advert).type === advertType,
    );

    res.status(200).json(offers);
  },
);

/**
 * Checks if a user can edit or delete an offer with a given id.
 * @param req The request containing the to be checked ids.
 */
async function _checkUserCanEditOrDeleteOffer(req: AuthenticatedRequest) {
  let userId = new ObjectId(req.user?.id);
  const { id } = req.params;

  // The user editing or deleting must be the offeror or offeree.
  let offer = await findOfferById(id, false);
  if (!offer.offeror.equals(userId) && !offer.offeror.equals(userId)) {
    throw new AppError(
      'Not authorized to edit this route',
      'Not authorized to edit this route',
      401,
    );
  }
}

async function _checkAuthorizedUser(userId: ObjectId, advertId: string) {
  const advert = await findAdvertById(advertId);
  return advert.store === userId;
}

/**
 * Returns a filtered list of that contains only offers related to the requesting user.
 * @param userId the requesting userId.
 * @param offers the returned offers list before the user check.
 * @returns the filtered list.
 */
function _findAndCheckRelatedOffers(userId: ObjectId, offers: Offer[]): any {
  let relatedOffers = offers.filter(
    (x) =>
      (x.offeror && x.offeror.equals(userId)) ||
      (x.offeree && x.offeree.equals(userId)),
  );

  // If no offers are retrieved with this request, throw an exception to inform the user.
  if (!relatedOffers?.length) {
    throw new AppError(
      'Not authorized to access this route',
      'Not authorized to access this route',
      401,
    );
  }

  return relatedOffers;
}
