import { type Response, Router } from 'express';
import asyncHandler from "express-async-handler"
import {findUserById, createUser, updateUser, delUser, findAllUsers} from "../services/userServices";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {AppError} from "../utils/errorHandler";
import { User } from '../entities/userEntity';


/**
 * This method verifies if the user is authorized to access the route
 * @param id
 * @param req
 */
export const verifyIfAuthorized = (id: string, req: AuthenticatedRequest) => {
    if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route', 401)
    }
}

/**
 * This method returns a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns a user object.
 */
export const getUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;
    verifyIfAuthorized(id, req);
    const user = await findUserById(id);
    res.status(200).json(user);
});

/**
 * This method returns a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns the public information of a user object.
 */
export const getStoreData = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;
    let user = await findUserById(id) as User;
    res.status(200).json({
        id: user.id,
        name: user.name,
        address: user.address,
        rating: user.rating
    });
});

/**
 * This method returns all users   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of user objects.
 */
export const getUsers = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const users = await findAllUsers();
    res.status(200).json(users);
});

/**
 * This method creates a new user. * TODO: This method should be removed later
 * @param req - The request object
 * @param res - The response object
 * @returns created user object.
 */
export const postUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await createUser(req.body);
    res.status(201).json(user);
});

/**
 * This method updates a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated user object.
 */
export const putUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;

    if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }

    const user = await updateUser(id, req.body);
    res.status(200).json(user);
});


/**
 * This method deletes a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted user object.
 */
export const deleteUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;

    if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }

    const user = await delUser(id);
    res.status(204).json(user);
});
