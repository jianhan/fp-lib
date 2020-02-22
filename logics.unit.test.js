"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logics_1 = require("./logics");
describe("hasPropertyAndNotEmpty function", () => {
    it("it should check positive", () => {
        const obj = {
            test: "test",
            example: "example",
            emptyStr: "",
            emptyArr: [],
            emptyObj: {},
            null: null,
        };
        expect(logics_1.hasPropertyAndNotEmpty("test", obj)).toBe(true);
        expect(logics_1.hasPropertyAndNotEmpty("emptyStr", obj)).toBe(false);
        expect(logics_1.hasPropertyAndNotEmpty("emptyArr", obj)).toBe(false);
        expect(logics_1.hasPropertyAndNotEmpty("emptyObj", obj)).toBe(false);
        expect(logics_1.hasPropertyAndNotEmpty("null", obj)).toBe(true);
    });
});
