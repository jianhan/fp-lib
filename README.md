# fp-lib

[![Greenkeeper badge](https://badges.greenkeeper.io/jianhan/fp-lib.svg)](https://greenkeeper.io/)
[![CodeFactor](https://www.codefactor.io/repository/github/jianhan/fp-lib/badge)](https://www.codefactor.io/repository/github/jianhan/fp-lib)
<a href="https://codeclimate.com/github/jianhan/fp-lib/maintainability"><img src="https://api.codeclimate.com/v1/badges/0f074aeda4ff49dd5123/maintainability" /></a>
<a href="https://codeclimate.com/github/jianhan/fp-lib/test_coverage"><img src="https://api.codeclimate.com/v1/badges/0f074aeda4ff49dd5123/test_coverage" /></a>
![Node.js CI & CD](https://github.com/jianhan/fp-lib/workflows/Node.js%20CI%20&%20CD/badge.svg?branch=master)
<br>

# fp-lib
A custom typescript functional programming libraries, including some common functions written in fp paradigm.

## Installation 
```sh
npm i jianhan-fp-lib
```
## Usage

### TypeScript
```typescript
import { hasPropertyAndNotEmpty } from "jianhan-fp-lib";
console.log(hasPropertyAndNotEmpty('name', {name: "test"}))
```
```sh
Output should be true
```
## Test 
```sh
npm run test
```