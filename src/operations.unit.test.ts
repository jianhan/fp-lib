import { isLeft, isRight, map } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import jsc from "jsverify";
import moment = require("moment");
import { prefixDateTime, arrUnique, arrTrim, listUnique, listRemoveEmpty, listTrim, boolPropToStr } from "./operations";
import * as immutable from "immutable"

const arrOfStr = "array string";

describe("prefixDateTime function", () => {

    it("should generate prefix based on date and time", () => {
        const result = prefixDateTime("YYYY-MM-DD HH:mm:ss")("test", moment("2000-01-01 00:00:00"));
        expect(isRight(result)).toBe(true);
        pipe(result, map((d: any) => expect(d).toBe("2000-01-01 00:00:00_test")));
    });

    it("should handle all kinds of string", () => {
        jsc.assert(
            jsc.forall("datetime", "string", (datetime: any, format: any) => {
                const actual = prefixDateTime(format)("test", moment(datetime));
                if (isRight(actual)) {
                    pipe(actual, map((dt: any) => expect(dt).toBe(moment(datetime).format(format) + "_test")));
                }

                return true;
            }),
        );
    });

    it("should handle format error correctly", () => {
        const result = prefixDateTime("\n")("test", moment("2000-01-01 00:00:00"));
        expect(isLeft(result)).toBe(true);
        pipe(result, map((d: any) => expect(d).toBeInstanceOf(Error)));
    });

});

describe("boolPropToStr function", () => {
    it("should produce the correct value when boolean and none boolean values are given", () => {
        const obj = { "bool1": true, "bool2": false, "noneBoolean1": "test", "noneBoolean2": {}, "noneBoolean3": 123 };
        expect(boolPropToStr("bool1")(obj)).toBe("true")
        expect(boolPropToStr("bool2")(obj)).toBe("false")
        expect(boolPropToStr("noneBoolean1")(obj)).toBe(obj.noneBoolean1)
        expect(boolPropToStr("noneBoolean2")(obj)).toBe(obj.noneBoolean2)
        expect(boolPropToStr("noneBoolean3")(obj)).toBe(obj.noneBoolean3)
    });

});

describe("arrUnique function", () => {
    it("should remove duplicates from array", () => {
        jsc.assert(
            jsc.forall(arrOfStr, (arr: string[]) => {
                return arr.every(v => arrUnique(arr).includes(v))
            })
        );
    });

});

describe("arrTrim function", () => {
    it("should trim every element within array", () => {
        jsc.assert(
            jsc.forall(arrOfStr, (arr: string[]) => {
                return arrTrim(arr).every(v => {
                    return !v.startsWith(" ") && !v.endsWith(" ")
                })
            })
        );
    });

});

describe("listUnique function", () => {
    it("should trim every element within immutable list", () => {
        jsc.assert(
            jsc.forall(arrOfStr, (arr: string[]) => {
                const uniqueList = listUnique(immutable.List.of(...arr)).toArray()

                return arr.every(v => uniqueList.includes(v))
            })
        );
    });
});

describe("listRemoveEmpty function", () => {
    it("should remove empty string within immutable list", () => {
        jsc.assert(
            jsc.forall(arrOfStr, (arr: string[]) => {
                return listRemoveEmpty(immutable.List.of(...arr)).toArray().filter(s => s === '').length === 0;

            })
        );
    });
});

describe("listTrim function", () => {
    it("should remove empty string within immutable list", () => {
        jsc.assert(
            jsc.forall(arrOfStr, (arr: string[]) => {
                return listTrim(immutable.List.of(...arr)).toArray().filter(s => s.startsWith(" " || s.endsWith(" "))).length === 0;

            })
        );
    });
});