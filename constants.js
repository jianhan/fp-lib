"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
/**
 * LogLevel defines different levels of logging.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["HTTP"] = "http";
    LogLevel["VERBOSE"] = "verbose";
    LogLevel["DEBUG"] = "debug";
    LogLevel["SILLY"] = "silly";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
// Environment defines types for different environments.
var Environment;
(function (Environment) {
    Environment["DEVELOPMENT"] = "development";
    Environment["STAGE"] = "stage";
    Environment["UAT"] = "uat";
    Environment["PRODUCTION"] = "production";
})(Environment = exports.Environment || (exports.Environment = {}));
/**
 * enumValues generates enum values from enum definition.
 * @param enums
 */
exports.enumValues = (enums) => ramda_1.default.keys(enums).map(k => enums[k]).map(v => v);
