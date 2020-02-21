import { isLeft, isRight, map } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import jsc from "jsverify";
import moment = require("moment");
import { prefixDateTime } from "./operations";

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
