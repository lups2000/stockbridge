import winston from "winston";
import environment from "./environment";


/**
 * This file is used to configure the logger.
 */
const logger = winston.createLogger({
    level: environment.LOG_LEVEL,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            ),
        }),
    ],
});

export default logger;
