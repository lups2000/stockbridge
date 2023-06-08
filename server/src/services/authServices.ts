import userModel from "../models/User";
import type { User } from "../entities/userEntity";
import logger from "../config/logger";
import environment from "../utils/environment";
import { AppError } from "../utils/errorHandler";

const serviceName = "authServices";

/**
 * Register a new user
 * @param user
 * @returns Promise containing the created user
 */
export const registerUser = async (user: User) => {
  logger.debug(`${serviceName}: Creating user ${user}`);
  let createdUser;

  if(await userModel.findOne({email: user.email})){
    throw new AppError("User already exists", "User already exists", 409);
  }

  try {
    createdUser = await userModel.create(user);
  } catch (err) {
    throw new AppError("Error in creating user", "Error in creating user", 400);
  }
  return sendTokenResponse(createdUser);
};

/**
 * Login a user
 * @param email
 * @param password
 * @returns Promise containing the user and the token
 */
export const loginUser = async (email: string, password: string) => {
  // Check for user
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", "Invalid credentials", 401);
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", "Invalid credentials", 401);
  }

  return sendTokenResponse(user);
};

export const logoutUser = async (email: string, password: string) => {
  // Check for user
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", "Invalid credentials", 401);
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", "Invalid credentials", 401);
  }

  return sendTokenResponse(user);
};

/**
 * Get token from model, create cookie and send response
 * @param user
 * @returns Promise containing the user and the token (with options)
 */
const sendTokenResponse = (user: User) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      // Expire in 30 days (in milliseconds)
      Date.now() + environment.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  return { user, token, options };
};
