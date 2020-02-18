var config = require('./jest.config');
config.testMatch = ["**/*.unit.test.ts"];
console.log('RUNNING UNIT TESTS ....');
module.exports = config;
