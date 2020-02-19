import { IsNotEmpty, IsString } from "class-validator";
import { getEnvs } from "./envs";

class Envs {
    @IsNotEmpty()
    @IsString()
    public NODE_ENV?: string;

    @IsNotEmpty()
    @IsString()
    public SERVICE_NAME?: string;

    @IsNotEmpty()
    @IsString()
    public API_KEY?: string;
}


describe("getEnvs function", () => {
    it("should get envs", async () => {
        const processEnv = { NODE_ENV: "development", SERVICE_NAME: "test", API_KEY: "test" };
        const envs = await getEnvs(processEnv, Envs);
        expect(envs.get("NODE_ENV")).toBe(processEnv.NODE_ENV);
        expect(envs.get("SERVICE_NAME")).toBe(processEnv.SERVICE_NAME);
        expect(envs.get("API_KEY")).toBe(processEnv.API_KEY);
    });

    it("should reject when validation fails", async () => {
        const processEnv = { SERVICE_NAME: "test", API_KEY: "test" };
        try {
            await getEnvs(processEnv, Envs);
        } catch (e) {
            expect(e).toBeInstanceOf(Array);
            expect(e[0].property).toBe("NODE_ENV");
        }
    });

});
