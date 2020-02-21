import { hasPropertyAndNotEmpty } from "./logics";

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

        expect(hasPropertyAndNotEmpty("test", obj)).toBe(true);
        expect(hasPropertyAndNotEmpty("emptyStr", obj)).toBe(false);
        expect(hasPropertyAndNotEmpty("emptyArr", obj)).toBe(false);
        expect(hasPropertyAndNotEmpty("emptyObj", obj)).toBe(false);
        expect(hasPropertyAndNotEmpty("null", obj)).toBe(true);
    });
});
