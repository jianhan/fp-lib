"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
/**
 * hasPropertyAndNotEmpty checks property exists and not empty.
 * @param k
 * @param input
 */
exports.hasPropertyAndNotEmpty = (k, input) => ramda_1.default.and(ramda_1.default.has(k)(input), ramda_1.default.propSatisfies(x => ramda_1.default.not(ramda_1.default.isEmpty(x)), k, input));
/**
 * notEmpty compose not and isEmpty.
 */
exports.notEmpty = ramda_1.default.compose(ramda_1.default.not, ramda_1.default.isEmpty);
