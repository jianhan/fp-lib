import R from "ramda";

/**
 * LogLevel defines different levels of logging.
 */
export enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    HTTP = "http",
    VERBOSE = "verbose",
    DEBUG = "debug",
    SILLY = "silly",
}

// Environment defines types for different environments.
export enum Environment {
    DEVELOPMENT = "development",
    STAGE = "stage",
    UAT = "uat",
    PRODUCTION = "production",
}

/**
 * enumValues generates enum values from enum definition.
 * @param enums
 */
export const enumValues = <T>(enums: any): T[] => R.keys(enums).map(k => enums[k]).map(v => v as T);
