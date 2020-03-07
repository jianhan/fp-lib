"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const constants_1 = require("./constants");
/**
 * getLogLevel defines different log level for different environment.
 * @param environment
 */
const getLogLevel = (environment) => {
    switch (environment) {
        case constants_1.Environment.DEVELOPMENT:
        case constants_1.Environment.STAGE:
        case constants_1.Environment.UAT:
            return constants_1.LogLevel.DEBUG;
        case constants_1.Environment.PRODUCTION:
            return constants_1.LogLevel.INFO;
    }
};
/*
 * createLogger creates a new logger.
 *
 * @param environment
 * @param service
 * @param level
 */
exports.createLogger = (environment, service, logLevel = '') => {
    logLevel = logLevel === '' ? getLogLevel(environment) : logLevel;
    const logger = winston_1.default.createLogger({
        level: logLevel,
        silent: false,
        format: winston_1.default.format.json(),
        defaultMeta: { service, environment },
        transports: [
            new winston_1.default.transports.Console({ format: winston_1.default.format.simple() }),
        ],
    });
    if (environment === constants_1.Environment.DEVELOPMENT) {
        logger.add(new winston_1.default.transports.File({ filename: "logs/error.log", level: logLevel }));
        logger.add(new winston_1.default.transports.File({ filename: "logs/combined.log", level: logLevel }));
    }
    return logger;
};
