/**
 * LogLevel defines different levels of logging.
 */
export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    HTTP = "http",
    VERBOSE = "verbose",
    DEBUG = "debug",
    SILLY = "silly"
}
export declare enum Environment {
    DEVELOPMENT = "development",
    STAGE = "stage",
    UAT = "uat",
    PRODUCTION = "production"
}
/**
 * enumValues generates enum values from enum definition.
 * @param enums
 */
export declare const enumValues: <T>(enums: any) => T[];
