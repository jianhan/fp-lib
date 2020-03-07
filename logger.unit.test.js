"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsverify_1 = __importDefault(require("jsverify"));
const constants_1 = require("./constants");
const logger_1 = require("./logger");
describe("createLogger function", () => {
    it("should create valid logger with valid inputs", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(jsverify_1.default.elements(constants_1.enumValues(constants_1.Environment)), jsverify_1.default.nestring, jsverify_1.default.elements(constants_1.enumValues(constants_1.LogLevel)), (env, service, level) => {
            const logger = logger_1.createLogger(env, service, level);
            return logger.level === level && !logger.silent;
        }));
    });
});
