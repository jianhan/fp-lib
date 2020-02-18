import {either} from "fp-ts/lib/Either";
import jsc from "jsverify";
import R from "ramda";
import {enumValues, Environment, LogLevel} from "./constants";
import {createLogger, getLogLevel} from "./logger";

describe("getLogLevel function", () => {

    it("should get valid log level", () => {
        jsc.assert(
            jsc.forall(jsc.elements(enumValues(Environment)), (env: any) => getLogLevel(env)._tag === "Right"),
        );
    });

    it("should return error when env is invalid", () => {
        jsc.assert(
            jsc.forall(jsc.nestring, jsc.nestring, (str: string, str1: string) => {
                return getLogLevel(str.concat(str1) as Environment)._tag === "Left";
            }),
        );
    });

});

describe("createLogger function", () => {

    it("should create valid logger with valid inputs", () => {
        jsc.assert(
            jsc.forall(
                jsc.elements(enumValues(Environment)), jsc.nestring, jsc.elements(enumValues(LogLevel)), (env: any, service: any, level: any) => {
                    const logger = createLogger(env, service, level);
                    return logger.level === level && !logger.silent;
            }),
        );
    });

});

describe("get logger functional style", () => {

    it("should return right with valid input", () => {
        jsc.assert(
            jsc.forall(
                jsc.elements(enumValues(Environment)), jsc.nestring, (env: any, service: any) => {
                    const t = either.map(
                        getLogLevel(env),
                        R.partial(createLogger, [env, service]),
                    );
                    return t._tag === "Right";
                }),
        );
    });

    it("should return left with invalid inputs", () => {
        jsc.assert(
            jsc.forall(
                // tslint:disable-next-line:no-identical-functions
                jsc.string, jsc.string, (env: any, service: any) => {
                    const t = either.map(
                        getLogLevel(env),
                        R.partial(createLogger, [env, service]),
                    );
                    return t._tag === "Left";
                }),
        );
    });

});
