import jsc from "jsverify";
import { enumValues, Environment, LogLevel } from "./constants";
import { createLogger } from "./logger";

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
