import winston from "winston";
import { Environment } from "./constants";
export declare const createLogger: (environment: Environment, service: string, logLevel?: string) => winston.Logger;
