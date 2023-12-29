# Json Querying Performance Testing

This repo is used to test the performance of json querying npm packages. The dataset used is [City Lots San Francisco in .json](https://github.com/zemirco/sf-city-lots-json).
The libraries tested are:

| Package                                                              | NPM Downloads                                                                                                  | Last commit                                                                                        |
| :--                                                                  | :--                                                                                                            | :--                                                                                                |
| [jmespath](https://www.npmjs.com/package/jmespath)               | [![npm](https://img.shields.io/npm/dw/jmespath.svg)](https://www.npmjs.com/package/jmespath)               | ![GitHub last commit](https://img.shields.io/github/last-commit/jmespath/jmespath.svg)            |
| [json-query](https://www.npmjs.com/package/json-query)               | [![npm](https://img.shields.io/npm/dw/json-query.svg)](https://www.npmjs.com/package/json-query)               | ![GitHub last commit](https://img.shields.io/github/last-commit/mmckegg/json-query.svg)            |
| [jsonpath-plus](https://www.npmjs.com/package/jsonpath-plus)         | [![npm](https://img.shields.io/npm/dw/jsonpath-plus.svg)](https://www.npmjs.com/package/jsonpath-plus)         | ![GitHub last commit](https://img.shields.io/github/last-commit/s3u/JSONPath.svg)                  |
| [jsonpath](https://www.npmjs.com/package/jsonpath)                   | [![npm](https://img.shields.io/npm/dw/jsonpath.svg)](https://www.npmjs.com/package/jsonpath)                   | ![GitHub last commit](https://img.shields.io/github/last-commit/dchester/jsonpath.svg)             |
| [JSONStream](https://www.npmjs.com/package/JSONStream)               | [![npm](https://img.shields.io/npm/dw/JSONStream.svg)](https://www.npmjs.com/package/JSONStream)               | ![GitHub last commit](https://img.shields.io/github/last-commit/dominictarr/JSONStream.svg)        |
| [oboe](https://www.npmjs.com/package/oboe)                           | [![npm](https://img.shields.io/npm/dw/oboe.svg)](https://www.npmjs.com/package/oboe)                           | ![GitHub last commit](https://img.shields.io/github/last-commit/jimhigson/oboe.js.svg)             |
| [map-filter-reduce](https://www.npmjs.com/package/map-filter-reduce) | [![npm](https://img.shields.io/npm/dw/map-filter-reduce.svg)](https://www.npmjs.com/package/map-filter-reduce) | ![GitHub last commit](https://img.shields.io/github/last-commit/dominictarr/map-filter-reduce.svg) |

`jsonpath-plus` and `jsonpath` use the [XPath for Json Specification](https://goessner.net/articles/JsonPath).
`json-query` has its own custom DSL. `JSONStream`, `oboe`, and `map-filter-reduce` are streaming libraries, though I've had varying success in making them anywhere near as performant.

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

Ran using Macbook Pro, 2.9 GHz Quad Core Intel Core i7, 16 GB 2133 MHz LPDDR3

```
$ npm run perf

> perf-json-querying@1.0.0 perf
> node --max-old-space-size=4096 src

smallCityLots 49998 items.
mediumCityLots 99998 items.
largeCityLots 206560 items.

smallCityLots:
- jmespath:
  - shallow took 0.0433 seconds.
  - deep took 0.0242 seconds.
  - conditional took 0.03 seconds.
- json-query:
  - shallow took 0.0122 seconds.
  - deep took 0.0185 seconds.
  - conditional took 0.0191 seconds.
- jsonpath-plus:
  - shallow took 0.4074 seconds.
  - deep took 0.3992 seconds.
  - conditional took 0.1272 seconds.
- jsonpath:
  - shallow took 1.4419 seconds.
  - deep took 10.2739 seconds.
  - conditional took 0.0279 seconds.
- JSONStream:
  - shallow took 3.2695 seconds.
  - deep took 3.4133 seconds.
- oboe:
  - shallow took 4.3055 seconds.
  - deep took 4.6955 seconds.
- map-filter-reduce:

mediumCityLots:
- jmespath:
  - shallow took 0.0204 seconds.
  - deep took 0.0143 seconds.
  - conditional took 0.0231 seconds.
- json-query:
  - shallow took 0.0195 seconds.
  - deep took 0.0409 seconds.
  - conditional took 0.0322 seconds.
- jsonpath-plus:
  - shallow took 0.8027 seconds.
  - deep took 0.8318 seconds.
  - conditional took 0.258 seconds.
- jsonpath:
  - shallow took 3.0419 seconds.
  - deep took 39.8507 seconds.
  - conditional took 0.054 seconds.
- JSONStream:
  - shallow took 6.4748 seconds.
  - deep took 7.1143 seconds.
- oboe:
  - shallow took 9.0225 seconds.
  - deep took 9.037 seconds.
- map-filter-reduce:

largeCityLots:
- jmespath:
  - shallow took 0.0185 seconds.
  - deep took 0.0325 seconds.
  - conditional took 0.0453 seconds.
- json-query:
json-query shallow failed, RangeError: Maximum call stack size exceeded.
json-query deep failed, RangeError: Maximum call stack size exceeded.
json-query conditional failed, RangeError: Maximum call stack size exceeded.
- jsonpath-plus:
  - shallow took 2.1476 seconds.
  - deep took 2.2733 seconds.
  - conditional took 0.5042 seconds.
- jsonpath:
  - shallow took 8.8206 seconds.
  - deep took 165.9704 seconds.
  - conditional took 0.1196 seconds.
- JSONStream:
  - shallow took 19.1526 seconds.
  - deep took 19.69 seconds.
- oboe:
  - shallow took 26.6115 seconds.
  - deep took 28.8616 seconds.
- map-filter-reduce:



summary:

smallCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│     jmespath      │      0.0433       │      0.0242       │       0.03        │
│    json-query     │      0.0122       │      0.0185       │      0.0191       │
│   jsonpath-plus   │      0.4074       │      0.3992       │      0.1272       │
│     jsonpath      │      1.4419       │      10.2739      │      0.0279       │
│    JSONStream     │      3.2695       │      3.4133       │  'not possible'   │
│       oboe        │      4.3055       │      4.6955       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
mediumCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│     jmespath      │      0.0204       │      0.0143       │      0.0231       │
│    json-query     │      0.0195       │      0.0409       │      0.0322       │
│   jsonpath-plus   │      0.8027       │      0.8318       │       0.258       │
│     jsonpath      │      3.0419       │      39.8507      │       0.054       │
│    JSONStream     │      6.4748       │      7.1143       │  'not possible'   │
│       oboe        │      9.0225       │       9.037       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
largeCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│     jmespath      │      0.0185       │      0.0325       │      0.0453       │
│    json-query     │     'failed'      │     'failed'      │     'failed'      │
│   jsonpath-plus   │      2.1476       │      2.2733       │      0.5042       │
│     jsonpath      │      8.8206       │     165.9704      │      0.1196       │
│    JSONStream     │      19.1526      │       19.69       │  'not possible'   │
│       oboe        │      26.6115      │      28.8616      │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```
