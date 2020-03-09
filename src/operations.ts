import { APIGatewayEvent } from "aws-lambda";
import { Either, tryCatch } from "fp-ts/lib/Either";
import { Map } from "immutable";
import * as moment from "moment";
import { Observable } from "rxjs";
import { sprintf } from "sprintf-js";
import { Logger } from "winston";
import { Environment } from "./constants";
import * as immutable from "immutable"
import _ from "lodash";
import S from "sanctuary"
import { identity } from "fp-ts/lib/function";
// tslint:disable-next-line: no-var-requires
const $ = require("sanctuary-def");

/**
 * prefixDateTime prefix any string with date and time for consist displaying as file ame.
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
 * LambdaFunc define a type alias for lambda function.
 */
export type LambdaFunc = (envs: Map<string, string | Environment | undefined>, logger: Logger, event: APIGatewayEvent) => Observable<any> | undefined;

/**
 * bool2Str convert a boolean value to string.
 * @param k
 */
// @ts-ignore
export const bool2Str = (k: string) => S.pipe([S.prop(k), S.ifElse(S.is($.Boolean))((v: boolean) => v ? "true" : "false")(identity)]);

/**
 * arrUnique takes an array as input and remove duplicates.
 *
 * @param array
 */
export const arrUnique = <T>(array: T[]): T[] => array.filter((a, b) => S.equals(array.indexOf(a))(b))

/**
 * arrTrim trims every string elements in array.
 *
 * @param array
 */
export const arrTrim = (array: string[]): string[] => array.map(_.trim)

/**
 * listUnique removes duplicates from immutable list.
 *
 * @param list
 */
export const listUnique = (list: immutable.List<any>): immutable.List<any> => list.toSet().toList();

/**
 * listRemoveEmpty removes empty values from an immutable list.
 *
 * @param list
 */
export const listRemoveEmpty = (list: immutable.List<any>): immutable.List<any> => list.filter((v: any) => !_.isEmpty(v))

/**
 * listTrim trims every elements in a immutable lit.
 *
 * @param list
 */
export const listTrim = (list: immutable.List<string>): immutable.List<string> => list.map((v: string) => _.trim(v));

/**
 * mapHasKey checks if a immutable map has key.
 *
 * @param key
 * @param map
 */
export const mapHasKey = (key: string, map: immutable.Map<string, any>) => map.has(key)

/**
 * mapGet gets value from immutable map by key.
 *
 * @param key
 * @param map
 */
export const mapGet = (key: string, map: immutable.Map<string, any>) => map.get(key)

/**
 * mapSet sets value for immutable map.
 * 
 * @param key
 * @param map
 * @param value
 */
export const mapSet = (key: string, map: immutable.Map<string, any>, value: any) => map.set(key, value)