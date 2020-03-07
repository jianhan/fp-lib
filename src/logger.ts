import winston from "winston";
import { Environment, LogLevel } from "./constants";

/**
 * getLogLevel defines different log level for different environment.
 * @param environment
 */
const getLogLevel = (environment: Environment): LogLevel => {
    switch (environment) {
        case Environment.DEVELOPMENT:
        case Environment.STAGE:
        case Environment.UAT:
            return LogLevel.DEBUG;
        case Environment.PRODUCTION:
            return LogLevel.INFO;
    }
};

/*
 * createLogger creates a new logger.
 *
 * @param environment
 * @param service
 * @param level
 */
export const createLogger = (environment: Environment, service: string, logLevel: string = ''): winston.Logger => {
    logLevel = logLevel === '' ? getLogLevel(environment) : logLevel;
    const logger = winston.createLogger({
        level: logLevel,
        silent: false,
        format: winston.format.json(),
        defaultMeta: { service, environment },
        transports: [
            new winston.transports.Console({ format: winston.format.simple() }),
        ],
    });

    if (environment === Environment.DEVELOPMENT) {
        logger.add(new winston.transports.File({ filename: "logs/error.log", level: logLevel }));
        logger.add(new winston.transports.File({ filename: "logs/combined.log", level: logLevel }));
    }

    return logger;
};
