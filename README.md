# Json Querying Performance Testing

This repo is used to test the performance of json querying npm packages. The dataset used is [City Lots San
Francisco in .json](https://github.com/zemirco/sf-city-lots-json). The three libraries tested are:

- [json-query](https://www.npmjs.com/package/json-query) [![npm](https://img.shields.io/npm/dw/json-query.svg)](https://www.npmjs.com/package/json-query)
- [jsonpath-plus](https://www.npmjs.com/package/jsonpath-plus) [![npm](https://img.shields.io/npm/dw/jsonpath-plus.svg)](https://www.npmjs.com/package/jsonpath-plus)
- [jsonpath](https://www.npmjs.com/package/jsonpath) [![npm](https://img.shields.io/npm/dw/jsonpath.svg)](https://www.npmjs.com/package/jsonpath)
- [JSONStream](https://www.npmjs.com/package/JSONStream) [![npm](https://img.shields.io/npm/dw/JSONStream.svg)](https://www.npmjs.com/package/JSONStream)

`jsonpath-plus` and `jsonpath` use the [XPath for Json Specification](https://goessner.net/articles/JsonPath),
while `json-query` has its own custom DSL.

## How to run

```
npm install
npm run perf
```

### Method Explaination

The performance test runs three queries on each of the libraries. All three queries are defined in
[src/index.js](./src/index.js) though the actual syntax varies slightly between them.

- `shallow` returns an object inside an array
- `deep` returns a string from the object inside the array
- `conditional` filters the results based on which lots have an 'UNKNOWN' street name, then returns an array
  of coordinates from inside the object

### Results

Ran using Macbook Pro, 2.2 GHz Intel Core i7, 16 GB 2400 MHz DDR4

```
$ npm run perf

> perf-json-querying@1.0.0 perf /Users/andrew/Code/scratchwork/perf-json-querying
> node --max-old-space-size=4096 src

smallCityLots 49998 items.
mediumCityLots 99998 items.
largeCityLots 206560 items.

smallCityLots:
- json-query:
  - shallow took 0.0329 seconds.
  - deep took 0.0495 seconds.
  - conditional took 0.0455 seconds.
- jsonpath-plus:
  - shallow took 0.3907 seconds.
  - deep took 0.3808 seconds.
  - conditional took 0.3051 seconds.
- jsonpath:
  - shallow took 1.0639 seconds.
  - deep took 6.0417 seconds.
  - conditional took 0.0285 seconds.
- JSONStream:
  - shallow took 2.4209 seconds.
  - deep took 2.4758 seconds.
  - conditional took 2.0678 seconds.
JSONStream conditional AssertError: result should have length 643 but instead is 0

mediumCityLots:
- json-query:
  - shallow took 0.0416 seconds.
  - deep took 0.0743 seconds.
  - conditional took 0.0491 seconds.
- jsonpath-plus:
  - shallow took 0.7514 seconds.
  - deep took 0.8055 seconds.
  - conditional took 0.6247 seconds.
- jsonpath:
  - shallow took 2.231 seconds.
  - deep took 36.6839 seconds.
  - conditional took 0.0478 seconds.
- JSONStream:
  - shallow took 4.8281 seconds.
  - deep took 5.4624 seconds.
  - conditional took 4.0842 seconds.
JSONStream conditional AssertError: result should have length 824 but instead is 0

largeCityLots:
- json-query:
json-query shallow failed, RangeError: Maximum call stack size exceeded.
json-query deep failed, RangeError: Maximum call stack size exceeded.
json-query conditional failed, RangeError: Maximum call stack size exceeded.
- jsonpath-plus:
  - shallow took 2.0191 seconds.
  - deep took 2.0583 seconds.
  - conditional took 1.1441 seconds.
- jsonpath:
  - shallow took 5.9584 seconds.
  - deep took 180.8738 seconds.
  - conditional took 0.1097 seconds.
- JSONStream:
  - shallow took 16.0752 seconds.
  - deep took 16.9739 seconds.
  - conditional took 14.3877 seconds.
JSONStream conditional AssertError: result should have length 2843 but instead is 0


summary:

smallCityLots
┌───────────────┬─────────┬────────┬─────────────┐
│    (index)    │ shallow │  deep  │ conditional │
├───────────────┼─────────┼────────┼─────────────┤
│  json-query   │ 0.0329  │ 0.0495 │   0.0455    │
│ jsonpath-plus │ 0.3907  │ 0.3808 │   0.3051    │
│   jsonpath    │ 1.0639  │ 6.0417 │   0.0285    │
│  JSONStream   │ 2.4209  │ 2.4758 │ 'incorrect' │
└───────────────┴─────────┴────────┴─────────────┘
mediumCityLots
┌───────────────┬─────────┬─────────┬─────────────┐
│    (index)    │ shallow │  deep   │ conditional │
├───────────────┼─────────┼─────────┼─────────────┤
│  json-query   │ 0.0416  │ 0.0743  │   0.0491    │
│ jsonpath-plus │ 0.7514  │ 0.8055  │   0.6247    │
│   jsonpath    │  2.231  │ 36.6839 │   0.0478    │
│  JSONStream   │ 4.8281  │ 5.4624  │ 'incorrect' │
└───────────────┴─────────┴─────────┴─────────────┘
largeCityLots
┌───────────────┬──────────┬──────────┬─────────────┐
│    (index)    │ shallow  │   deep   │ conditional │
├───────────────┼──────────┼──────────┼─────────────┤
│  json-query   │ 'failed' │ 'failed' │  'failed'   │
│ jsonpath-plus │  2.0191  │  2.0583  │   1.1441    │
│   jsonpath    │  5.9584  │ 180.8738 │   0.1097    │
│  JSONStream   │ 16.0752  │ 16.9739  │ 'incorrect' │
└───────────────┴──────────┴──────────┴─────────────┘
```
