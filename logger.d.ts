import { Either } from "fp-ts/lib/Either";
import winston from "winston";
import { Environment, LogLevel } from "./constants";
/**
 * createLoggerByEnvMap create an logger instance based on environment.
 * @param m
 */
export declare const createLoggerByEnvMap: (m: any) => Either<Error, winston.Logger>;
/**
 * getLogLevel defines different log level for different environment.
 * @param environment
 */
export declare const getLogLevel: (environment: Environment) => Either<Error, LogLevel>;
export declare const createLogger: (environment: string, service: string, level: string) => winston.Logger;
