import userModel from "../models/User";
import type {User} from "../entities/userEntity";
import logger from "../utils/logger";
import {AppError} from "../utils/errorHandler";

const serviceName = 'userServices';

/**
 * Find a user by id
 * @param id
 * @returns Promise containing the user
 */
export const findUserById = async (id: string) => {
    logger.debug(`${serviceName}: Finding user with id: ${id}`);
    const user = await userModel.findById(id);

    if (!user) {
        logger.error(`${serviceName}: User not found with id of ${id}`);
        throw new AppError('User not found', 'User not found', 404);
    }

    logger.debug(`${serviceName}: Returning user ${user}`);
    return user;
}

/**
 * create a user
 * @param user
 * @returns Promise containing the user
 */
export const createUser = async (user: User) => {
    logger.debug(`${serviceName}: Creating user ${user}`)
    return await userModel.create(user);
}

/**
 * Update a user
 * @param id
 * @param user
 * @returns Promise containing the updated user
 */
export const updateUser = async (id: string, user: User) => {
    logger.debug(`${serviceName}: Updating user with id: ${id} with ${user}`)
    return userModel.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true
    });
}

/**
 * Delete a user
 * @param id
 * @returns Promise containing the deleted user
 */
export const delUser = async (id: string) => {
    logger.debug(`${serviceName}: Deleting user with id: ${id}`)
    return userModel.findByIdAndDelete(id);
}

/**
 * Find all users // TODO: This is a test function, remove it later
 * @returns Promise containing all users
 */
export const findAllUsers = async () => {
    logger.debug(`${serviceName}: Finding all users`)
    return userModel.find();
}