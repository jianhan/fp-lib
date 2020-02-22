"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const immer_1 = __importDefault(require("immer"));
const sprintf_js_1 = require("sprintf-js");
/**
 * prefixDateTime prefix any string with date and time for consist displayingsuch as file ame.
 * @param ft
 */
exports.prefixDateTime = (ft) => (name, dateTime) => {
    return Either_1.tryCatch(() => sprintf_js_1.sprintf("%s_%s", dateTime.format(ft), name), reason => new Error(String(reason)));
};
/**
 * simpleLog produce a simple log function.
 * @param logger
 * @param level
 * @param message
 * @param meta
 */
exports.simpleLog = (logger, level, message, ...meta) => logger.log({ level, message, ...meta });
/**
 * updateProp updates property of an object in an immutable way.
 * @param k
 * @param v
 * @param state
 */
exports.updateProp = (k, v, state) => immer_1.default(state, draft => {
    draft[k] = v;
});
