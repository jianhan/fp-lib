// getEnvs retrieves environment variables.
import { validate } from "class-validator";
import { Map } from "immutable";
import ProcessEnv = NodeJS.ProcessEnv;
import { Environment } from "./constants";

/**
 * getEnvs generates map representation of environment variables.
 *
 * @param envs
 * @param c
 */
export const getEnvs = async <T>(envs: ProcessEnv, c: new () => T): Promise<Map<string, string | Environment | undefined>> => {
    const envsObj = Object.assign(new c(), envs);
    return new Promise<Map<string, string | undefined>>((resolve, reject) => {
        return validate(envsObj).then(errors => {
            if (errors.length > 0) {
                reject(errors);
            }
            resolve(Map(envsObj));
        });
    });
};
