/// <reference types="node" />
import { Map } from "immutable";
import ProcessEnv = NodeJS.ProcessEnv;
/**
 * getEnvs generates map representation of environment variables.
 *
 * @param envs
 * @param c
 */
export declare const getEnvs: <T>(envs: ProcessEnv, c: new () => T) => Promise<Map<string, string | undefined>>;
