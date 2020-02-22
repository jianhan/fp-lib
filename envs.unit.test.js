"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const envs_1 = require("./envs");
class Envs {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Envs.prototype, "NODE_ENV", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Envs.prototype, "SERVICE_NAME", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Envs.prototype, "API_KEY", void 0);
describe("getEnvs function", () => {
    it("should get envs", async () => {
        const processEnv = { NODE_ENV: "development", SERVICE_NAME: "test", API_KEY: "test" };
        const envs = await envs_1.getEnvs(processEnv, Envs);
        expect(envs.get("NODE_ENV")).toBe(processEnv.NODE_ENV);
        expect(envs.get("SERVICE_NAME")).toBe(processEnv.SERVICE_NAME);
        expect(envs.get("API_KEY")).toBe(processEnv.API_KEY);
    });
    it("should reject when validation fails", async () => {
        const processEnv = { SERVICE_NAME: "test", API_KEY: "test" };
        try {
            await envs_1.getEnvs(processEnv, Envs);
        }
        catch (e) {
            expect(e).toBeInstanceOf(Array);
            expect(e[0].property).toBe("NODE_ENV");
        }
    });
});
