var config = require("./jest.config");
config.testMatch = ["**/*.int.test.ts"];
config.coverageDirectory = "";
config.collectCoverage = false;
config.setupFiles = ["dotenv/config"];
module.exports = config;
