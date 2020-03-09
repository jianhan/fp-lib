import { APIGatewayEvent } from "aws-lambda";
import { Either } from "fp-ts/lib/Either";
import { Map } from "immutable";
import * as moment from "moment";
import { Observable } from "rxjs";
import { Logger } from "winston";
import { Environment } from "./constants";
import * as immutable from "immutable";
/**
 * prefixDateTime prefix any string with date and time for consist displaying as file ame.
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
 * LambdaFunc define a type alias for lambda function.
 */
export declare type LambdaFunc = (envs: Map<string, string | Environment | undefined>, logger: Logger, event: APIGatewayEvent) => Observable<any> | undefined;
/**
 * bool2Str convert a boolean value to string.
 * @param k
 */
export declare const bool2Str: (v: boolean) => "false" | "true";
/**
 * boolPropToStr get a string representation value of bool within a object.
 *
 * @param k
 */
export declare const boolPropToStr: (k: string) => (x: any) => unknown;
/**
 * arrUnique takes an array as input and remove duplicates.
 *
 * @param array
 */
export declare const arrUnique: <T>(array: T[]) => T[];
/**
 * arrTrim trims every string elements in array.
 *
 * @param array
 */
export declare const arrTrim: (array: string[]) => string[];
/**
 * listUnique removes duplicates from immutable list.
 *
 * @param list
 */
export declare const listUnique: (list: immutable.List<any>) => immutable.List<any>;
/**
 * listRemoveEmpty removes empty values from an immutable list.
 *
 * @param list
 */
export declare const listRemoveEmpty: (list: immutable.List<any>) => immutable.List<any>;
/**
 * listTrim trims every elements in a immutable lit.
 *
 * @param list
 */
export declare const listTrim: (list: immutable.List<string>) => immutable.List<string>;
/**
 * mapHasKey checks if a immutable map has key.
 *
 * @param key
 * @param map
 */
export declare const mapHasKey: (key: string, map: Map<string, any>) => boolean;
/**
 * mapGet gets value from immutable map by key.
 *
 * @param key
 * @param map
 */
export declare const mapGet: (key: string, map: Map<string, any>) => any;
/**
 * mapSet sets value for immutable map.
 *
 * @param key
 * @param map
 * @param value
 */
export declare const mapSet: (key: string, map: Map<string, any>, value: any) => Map<string, any>;
