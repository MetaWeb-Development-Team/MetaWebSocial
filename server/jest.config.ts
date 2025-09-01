// jest.config.ts
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
   preset: "ts-jest",
   testEnvironment: "node",
   testMatch: ["**/tests/**/*.test.ts"],
   moduleFileExtensions: ["ts", "js"],
};

export default config;
