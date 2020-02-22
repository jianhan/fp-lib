"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const jsverify_1 = __importDefault(require("jsverify"));
const ramda_1 = __importDefault(require("ramda"));
const constants_1 = require("./constants");
const logger_1 = require("./logger");
describe("getLogLevel function", () => {
    it("should get valid log level", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(jsverify_1.default.elements(constants_1.enumValues(constants_1.Environment)), (env) => logger_1.getLogLevel(env)._tag === "Right"));
    });
    it("should return error when env is invalid", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(jsverify_1.default.nestring, jsverify_1.default.nestring, (str, str1) => {
            return logger_1.getLogLevel(str.concat(str1))._tag === "Left";
        }));
    });
});
describe("createLogger function", () => {
    it("should create valid logger with valid inputs", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(jsverify_1.default.elements(constants_1.enumValues(constants_1.Environment)), jsverify_1.default.nestring, jsverify_1.default.elements(constants_1.enumValues(constants_1.LogLevel)), (env, service, level) => {
            const logger = logger_1.createLogger(env, service, level);
            return logger.level === level && !logger.silent;
        }));
    });
});
describe("get logger functional style", () => {
    it("should return right with valid input", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(jsverify_1.default.elements(constants_1.enumValues(constants_1.Environment)), jsverify_1.default.nestring, (env, service) => {
            const t = Either_1.either.map(logger_1.getLogLevel(env), ramda_1.default.partial(logger_1.createLogger, [env, service]));
            return t._tag === "Right";
        }));
    });
    it("should return left with invalid inputs", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(
        // tslint:disable-next-line:no-identical-functions
        jsverify_1.default.string, jsverify_1.default.string, (env, service) => {
            const t = Either_1.either.map(logger_1.getLogLevel(env), ramda_1.default.partial(logger_1.createLogger, [env, service]));
            return t._tag === "Left";
        }));
    });
});
