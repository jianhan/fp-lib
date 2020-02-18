module.exports = {
  "globalSetup": "./jest/setup.js",
  "maxConcurrency": 7,
  "errorOnDeprecated": true,
  "displayName": {
    name: "DEFAULT",
    color: "red",
  },
  "globals": {
    // "NODE_ENV": process.env.NODE_ENV,
    "ts-jest": {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/dist/",
    "/coverage/",
  ],
  "clearMocks": true,
  "verbose": true,
  "roots": [
    "<rootDir>/src",
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "testMatch": [
    "**/*.test.ts",
  ],
  "collectCoverageFrom": [
    "**/*.{js,jsx,ts}",
    "!**/*.test.{js,jsx,ts}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  "coveragePathIgnorePatterns": ["/node_modules/", "dist"],
  "coverageDirectory": "coverage",
  "collectCoverage": true,
};
