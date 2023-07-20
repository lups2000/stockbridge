import userModel from '../models/User';
import type { User } from '../entities/userEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';
import { SubscriptionStatus, SubscriptionType } from '../entities/userEntity';
const serviceName = 'userServices';

/**
 * Find a user by id
 * @param id
 * @returns Promise containing the user
 */
export const findUserById = async (id: string) => {
  //logger.debug(`${serviceName}: Finding user with id: ${id}`);
  const user = await userModel.findById(id);

  if (!user) {
    logger.error(`${serviceName}: User not found with id of ${id}`);
    throw new AppError('User not found', 'User not found', 404);
  }

  //logger.debug(`${serviceName}: Returning user ${user}`);
  return user;
};

/**
 * create a user
 * @param user
 * @returns Promise containing the user
 */
export const createUser = async (user: User) => {
  logger.debug(`${serviceName}: Creating user ${user}`);
  return await userModel.create(user);
};

/**
 * Update a user
 * @param id
 * @param user
 * @returns Promise containing the updated user
 */
export const updateUser = async (id: string, user: User) => {
  logger.debug(`${serviceName}: Updating user with id: ${id} with ${user}`);

  if (user.hasOwnProperty('prioritisationTickets')) {
    const existingUser = await userModel.findById(id);
    if (existingUser?.prioritisationTickets! < user.prioritisationTickets) {
      logger.error(
        'An increase of the number of tickets is only possible through a premium subscription',
      );
    }
  }

  return userModel.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete a user
 * @param id
 * @returns Promise containing the deleted user
 */
export const delUser = async (id: string) => {
  logger.debug(`${serviceName}: Deleting user with id: ${id}`);
  return userModel.findByIdAndDelete(id);
};

/**
 * Find all users // TODO: This is a test function, remove it later
 * @returns Promise containing all users
 */
export const findAllUsers = async () => {
  logger.debug(`${serviceName}: Finding all users`);
  return userModel.find();
};

export const handleSubscription = async (
  userId: string,
  status: SubscriptionStatus,
  subscriptionType?: SubscriptionType,
  startDate?: Date,
  endDate?: Date,
) => {
  logger.debug(
    `${serviceName}: Handling subscription for ${userId} for ${status} with ${subscriptionType}`,
  );
  const user = (await userModel.findById(userId)) as User;
  user.subscription = {
    status: status,
    from: startDate!,
    to: endDate!,
    type: subscriptionType!,
  };
  if (status === SubscriptionStatus.ACTIVE) {
    switch (subscriptionType) {
      case SubscriptionType.BASIC_SUBSCRIPTION:
        user.prioritisationTickets += 12;
        break;
      case SubscriptionType.ADVANCED_SUBSCRIPTION:
        user.prioritisationTickets += 20;
        break;
      case SubscriptionType.PREMIUM_SUBSCRIPTION:
        user.prioritisationTickets += 40;
        break;
      default:
        break;
    }
  }
  logger.debug(`${serviceName}: Updating user ${userId} with ${user}`);
  await userModel.findByIdAndUpdate(user.id, user);
};

export async function deductTicket(userId: string): Promise<User | undefined> {
  const existingUser = await findUserById(userId);
  if (existingUser) {
    if (
      existingUser?.prioritisationTickets &&
      existingUser?.prioritisationTickets! >= 1
    ) {
      existingUser!.prioritisationTickets =
        existingUser.prioritisationTickets - 1;
    } else {
      logger.error('Insufficient number of tickets');
    }
    return existingUser;
  }
}
