"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const immutable_1 = require("immutable");
const ramda_1 = __importDefault(require("ramda"));
const winston_1 = __importDefault(require("winston"));
const constants_1 = require("./constants");
/**
 * createLoggerByEnvMap create an logger instance based on environment.
 * @param m
 */
exports.createLoggerByEnvMap = (m) => {
    return Either_1.either.map(exports.getLogLevel(m.get("NODE_ENV")), ramda_1.default.curry(exports.createLogger)(m.get("NODE_ENV"), m.get("SERVICE_NAME")));
};
/**
 * getLogLevel defines different log level for different environment.
 * @param environment
 */
exports.getLogLevel = (environment) => {
    switch (environment) {
        case constants_1.Environment.DEVELOPMENT:
        case constants_1.Environment.STAGE:
        case constants_1.Environment.UAT:
            return Either_1.right(constants_1.LogLevel.DEBUG);
        case constants_1.Environment.PRODUCTION:
            return Either_1.right(constants_1.LogLevel.INFO);
    }
    return Either_1.left(new Error(`unknown environment ${environment}`));
};
/*
 * createLogger creates a new logger.
 *
 * @param environment
 * @param service
 * @param level
 */
exports.createLogger = (environment, service, level) => {
    const l = winston_1.default.createLogger({
        level,
        silent: false,
        format: winston_1.default.format.json(),
        defaultMeta: { service, environment },
        transports: [
            new winston_1.default.transports.Console({ format: winston_1.default.format.simple() }),
        ],
    });
    if (environment === constants_1.Environment.DEVELOPMENT) {
        l.add(new winston_1.default.transports.File({ filename: "logs/error.log", level }));
        l.add(new winston_1.default.transports.File({ filename: "logs/combined.log" }));
    }
    return immutable_1.fromJS(l);
};
