import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "json", "ts"],
  modulePaths: ["<rootDir>"],
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.(t|j)s",
    "!src/logger/**",
    "!src/enums/**",
    "!src/validators/**",
    "!src/config/**",
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 6.9,
      functions: 9.4,
      lines: 25.91,
      statements: 26.4,
    },
  },
  testEnvironment: "node",
  verbose: true,
  maxWorkers: 1,
};

export default config;
