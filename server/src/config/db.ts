import mongoose from 'mongoose';
import environment from "../utils/environment";
import logger from "../utils/logger";

const serviceName = 'db';

/**
 * This file is used to configure the database connection.
 */
export const connectDB = async () => {
    logger.debug(`${serviceName}: Connecting to MongoDB at: ${environment.MONGO_URI}`)

    const conn = await mongoose.connect(environment.MONGO_URI);

    logger.debug(`${serviceName}: MongoDB Connected: ${conn.connection.host}`)
};