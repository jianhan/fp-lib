"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const pipeable_1 = require("fp-ts/lib/pipeable");
const jsverify_1 = __importDefault(require("jsverify"));
const moment = require("moment");
const operations_1 = require("./operations");
const immutable = __importStar(require("immutable"));
const arrOfStr = "array string";
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
describe("boolPropToStr function", () => {
    it("should produce the correct value when boolean and none boolean values are given", () => {
        const obj = { "bool1": true, "bool2": false, "noneBoolean1": "test", "noneBoolean2": {}, "noneBoolean3": 123 };
        expect(operations_1.boolPropToStr("bool1")(obj)).toBe("true");
        expect(operations_1.boolPropToStr("bool2")(obj)).toBe("false");
        expect(operations_1.boolPropToStr("noneBoolean1")(obj)).toBe(obj.noneBoolean1);
        expect(operations_1.boolPropToStr("noneBoolean2")(obj)).toBe(obj.noneBoolean2);
        expect(operations_1.boolPropToStr("noneBoolean3")(obj)).toBe(obj.noneBoolean3);
    });
});
describe("arrUnique function", () => {
    it("should remove duplicates from array", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(arrOfStr, (arr) => {
            return arr.every(v => operations_1.arrUnique(arr).includes(v));
        }));
    });
});
describe("arrTrim function", () => {
    it("should trim every element within array", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(arrOfStr, (arr) => {
            return operations_1.arrTrim(arr).every(v => {
                return !v.startsWith(" ") && !v.endsWith(" ");
            });
        }));
    });
});
describe("listUnique function", () => {
    it("should trim every element within immutable list", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(arrOfStr, (arr) => {
            const uniqueList = operations_1.listUnique(immutable.List.of(...arr)).toArray();
            return arr.every(v => uniqueList.includes(v));
        }));
    });
});
describe("listRemoveEmpty function", () => {
    it("should remove empty string within immutable list", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(arrOfStr, (arr) => {
            return operations_1.listRemoveEmpty(immutable.List.of(...arr)).toArray().filter(s => s === '').length === 0;
        }));
    });
});
describe("listTrim function", () => {
    it("should remove empty string within immutable list", () => {
        jsverify_1.default.assert(jsverify_1.default.forall(arrOfStr, (arr) => {
            return operations_1.listTrim(immutable.List.of(...arr)).toArray().filter(s => s.startsWith(" " || s.endsWith(" "))).length === 0;
        }));
    });
});
