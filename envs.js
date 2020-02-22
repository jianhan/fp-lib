"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// getEnvs retrieves environment variables.
const class_validator_1 = require("class-validator");
const immutable_1 = require("immutable");
/**
 * getEnvs generates map representation of environment variables.
 *
 * @param envs
 * @param c
 */
exports.getEnvs = async (envs, c) => {
    const envsObj = Object.assign(new c(), envs);
    return new Promise((resolve, reject) => {
        return class_validator_1.validate(envsObj).then(errors => {
            if (errors.length > 0) {
                reject(errors);
            }
            resolve(immutable_1.Map(envsObj));
        });
    });
};
