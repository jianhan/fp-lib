import { APIGatewayEvent } from "aws-lambda";
import { Either } from "fp-ts/lib/Either";
import { Map } from "immutable";
import * as moment from "moment";
import { Observable } from "rxjs";
import { Logger } from "winston";
import { Environment } from "./constants";
/**
 * prefixDateTime prefix any string with date and time for consist displayingsuch as file ame.
 * @param ft
 */
export declare const prefixDateTime: (ft: string) => (name: string, dateTime: moment.Moment) => Either<Error, string>;
/**
 * simpleLog produce a simple log function.
 * @param logger
 * @param level
 * @param message
 * @param meta
 */
export declare const simpleLog: (logger: Logger, level: string, message: string, ...meta: any[]) => Logger;
/**
 * updateProp updates property of an object in an immutable way.
 * @param k
 * @param v
 * @param state
 */
export declare const updateProp: (k: string, v: any, state: {
    [key: string]: any;
}) => {
    [key: string]: any;
};
/**
 * LambdaFunc define a type alias for lambda function.
 */
export declare type LambdaFunc = (envs: Map<string, string | Environment | undefined>, logger: Logger, event: APIGatewayEvent) => Observable<any> | undefined;
