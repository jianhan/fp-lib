"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const sprintf_js_1 = require("sprintf-js");
const lodash_1 = __importDefault(require("lodash"));
const sanctuary_1 = __importDefault(require("sanctuary"));
const function_1 = require("fp-ts/lib/function");
// tslint:disable-next-line: no-var-requires
const $ = require("sanctuary-def");
/**
 * prefixDateTime prefix any string with date and time for consist displaying as file ame.
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
 * bool2Str convert a boolean value to string.
 * @param k
 */
// @ts-ignore
exports.bool2Str = (v) => v ? "true" : "false";
/**
 * boolPropToStr get a string representation value of bool within a object.
 *
 * @param k
 */
exports.boolPropToStr = (k) => sanctuary_1.default.pipe([sanctuary_1.default.prop(k), sanctuary_1.default.ifElse(sanctuary_1.default.is($.Boolean))(exports.bool2Str)(function_1.identity)]);
/**
 * arrUnique takes an array as input and remove duplicates.
 *
 * @param array
 */
exports.arrUnique = (array) => array.filter((a, b) => sanctuary_1.default.equals(array.indexOf(a))(b));
/**
 * arrTrim trims every string elements in array.
 *
 * @param array
 */
exports.arrTrim = (array) => array.map(lodash_1.default.trim);
/**
 * listUnique removes duplicates from immutable list.
 *
 * @param list
 */
exports.listUnique = (list) => list.toSet().toList();
/**
 * listRemoveEmpty removes empty values from an immutable list.
 *
 * @param list
 */
exports.listRemoveEmpty = (list) => list.filter((v) => !lodash_1.default.isEmpty(v));
/**
 * listTrim trims every elements in a immutable lit.
 *
 * @param list
 */
exports.listTrim = (list) => list.map((v) => lodash_1.default.trim(v));
/**
 * mapHasKey checks if a immutable map has key.
 *
 * @param key
 * @param map
 */
exports.mapHasKey = (key, map) => map.has(key);
/**
 * mapGet gets value from immutable map by key.
 *
 * @param key
 * @param map
 */
exports.mapGet = (key, map) => map.get(key);
/**
 * mapSet sets value for immutable map.
 *
 * @param key
 * @param map
 * @param value
 */
exports.mapSet = (key, map, value) => map.set(key, value);
