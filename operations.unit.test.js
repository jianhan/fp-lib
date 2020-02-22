"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const pipeable_1 = require("fp-ts/lib/pipeable");
const jsverify_1 = __importDefault(require("jsverify"));
const moment = require("moment");
const operations_1 = require("./operations");
describe("prefixDateTime function", () => {
    it("should generate prefix based on date and time", () => {
        const result = operations_1.prefixDateTime("YYYY-MM-DD HH:mm:ss")("test", moment("2000-01-01 00:00:00"));
        expect(Either_1.isRight(result)).toBe(true);
        pipeable_1.pipe(result, Either_1.map((d) => expect(d).toBe("2000-01-01 00:00:00_test")));
    });
    it("should handle all kinds of string", () => {
        jsverify_1.default.assert(jsverify_1.default.forall("datetime", "string", (datetime, format) => {
            const actual = operations_1.prefixDateTime(format)("test", moment(datetime));
            if (Either_1.isRight(actual)) {
                pipeable_1.pipe(actual, Either_1.map((dt) => expect(dt).toBe(moment(datetime).format(format) + "_test")));
            }
            return true;
        }));
    });
    it("should handle format error correctly", () => {
        const result = operations_1.prefixDateTime("\n")("test", moment("2000-01-01 00:00:00"));
        expect(Either_1.isLeft(result)).toBe(true);
        pipeable_1.pipe(result, Either_1.map((d) => expect(d).toBeInstanceOf(Error)));
    });
});
