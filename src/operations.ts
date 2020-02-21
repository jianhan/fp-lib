import { APIGatewayEvent } from "aws-lambda";
import { Either, tryCatch } from "fp-ts/lib/Either";
import produce from "immer";
import { Map } from "immutable";
import * as moment from "moment";
import { Observable } from "rxjs";
import { sprintf } from "sprintf-js";
import { Logger } from "winston";
import { Environment } from "./constants";

/**
 * prefixDateTime prefix any string with date and time for consist displayingsuch as file ame.
 * @param ft
 */
export const prefixDateTime = (ft: string) => (name: string, dateTime: moment.Moment): Either<Error, string> => {
    return tryCatch(() => sprintf("%s_%s", dateTime.format(ft), name), reason => new Error(String(reason)));
};

/**
 * simpleLog produce a simple log function.
 * @param logger
 * @param level
 * @param message
 * @param meta
 */

export const simpleLog = (logger: Logger, level: string, message: string, ...meta: any[]) => logger.log({ level, message, ...meta });

/**
 * updateProp updates property of an object in an immutable way.
 * @param k
 * @param v
 * @param state
 */
export const updateProp = (k: string, v: any, state: { [key: string]: any }): { [key: string]: any } => produce(state, draft => {
    draft[k] = v;
});

/**
 * LambdaFunc define a type alias for lambda function.
 */
export type LambdaFunc = (envs: Map<string, string | Environment | undefined>, logger: Logger, event: APIGatewayEvent) => Observable<any> | undefined;
