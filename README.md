# Json Querying Performance Testing

This repo is used to test the performance of json querying npm packages. The dataset used is [City Lots San Francisco in .json](https://github.com/zemirco/sf-city-lots-json).
The libraries tested are:

| Package                                                              | NPM Downloads                                                                                                  | Last commit                                                                                        |
| :--                                                                  | :--                                                                                                            | :--                                                                                                |
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

Ran using a 4.0 GHz Intel Core i7-4790k, 16 GB 1600 MHz DDR3

```
$ npm run perf

> perf-json-querying@1.0.0 perf C:\Users\Jesse\Documents\Projects\json-querying-performance-testing
> node --max-old-space-size=4096 src

smallCityLots 49998 items.
mediumCityLots 99998 items.
largeCityLots 206560 items.

smallCityLots:
- json-query:
  - shallow took 0.0131 seconds.
  - deep took 0.0257 seconds.
  - conditional took 0.0278 seconds.
- jsonpath-plus:
  - shallow took 0.3732 seconds.
  - deep took 0.3694 seconds.
  - conditional took 0.3274 seconds.
- jsonpath:
  - shallow took 0.9304 seconds.
  - deep took 5.4267 seconds.
  - conditional took 0.0221 seconds.
- JSONStream:
  - shallow took 2.1897 seconds.
  - deep took 2.2671 seconds.
- oboe:
  - shallow took 2.7426 seconds.
  - deep took 2.8148 seconds.
- json-power-query:
  - shallow took 0.0059 seconds.
  - deep took 0.0053 seconds.
  - conditional took 0.0077 seconds.
- map-filter-reduce:

mediumCityLots:
- json-query:
  - shallow took 0.0162 seconds.
  - deep took 0.0236 seconds.
  - conditional took 0.0176 seconds.
- jsonpath-plus:
  - shallow took 0.7508 seconds.
  - deep took 0.7786 seconds.
  - conditional took 0.9143 seconds.
- jsonpath:
  - shallow took 1.9927 seconds.
  - deep took 21.0271 seconds.
  - conditional took 0.0369 seconds.
- JSONStream:
  - shallow took 4.5762 seconds.
  - deep took 4.9277 seconds.
- oboe:
  - shallow took 5.8425 seconds.
  - deep took 5.8037 seconds.
- json-power-query:
  - shallow took 0.0363 seconds.
  - deep took 0.0192 seconds.
  - conditional took 0.025 seconds.
- map-filter-reduce:

largeCityLots:
- json-query:
json-query shallow failed, RangeError: Maximum call stack size exceeded.
json-query deep failed, RangeError: Maximum call stack size exceeded.
json-query conditional failed, RangeError: Maximum call stack size exceeded.
- jsonpath-plus:
  - shallow took 2.4115 seconds.
  - deep took 2.1583 seconds.
  - conditional took 1.3796 seconds.
- jsonpath:
  - shallow took 5.6833 seconds.
  - deep took 89.3399 seconds.
  - conditional took 0.0764 seconds.
- JSONStream:
  - shallow took 13.2306 seconds.
  - deep took 13.5396 seconds.
- oboe:
  - shallow took 16.4231 seconds.
  - deep took 17.4351 seconds.
- json-power-query:
  - shallow took 0.0677 seconds.
  - deep took 0.0541 seconds.
  - conditional took 0.0538 seconds.
- map-filter-reduce:



summary:

smallCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0131       │      0.0257       │      0.0278       │
│   jsonpath-plus   │      0.3732       │      0.3694       │      0.3274       │
│     jsonpath      │      0.9304       │      5.4267       │      0.0221       │
│    JSONStream     │      2.1897       │      2.2671       │  'not possible'   │
│       oboe        │      2.7426       │      2.8148       │  'not possible'   │
│ json-power-query  │      0.0059       │      0.0053       │      0.0077       │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
mediumCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0162       │      0.0236       │      0.0176       │
│   jsonpath-plus   │      0.7508       │      0.7786       │      0.9143       │
│     jsonpath      │      1.9927       │      21.0271      │      0.0369       │
│    JSONStream     │      4.5762       │      4.9277       │  'not possible'   │
│       oboe        │      5.8425       │      5.8037       │  'not possible'   │
│ json-power-query  │      0.0363       │      0.0192       │       0.025       │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
largeCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │     'failed'      │     'failed'      │     'failed'      │
│   jsonpath-plus   │      2.4115       │      2.1583       │      1.3796       │
│     jsonpath      │      5.6833       │      89.3399      │      0.0764       │
│    JSONStream     │      13.2306      │      13.5396      │  'not possible'   │
│       oboe        │      16.4231      │      17.4351      │  'not possible'   │
│ json-power-query  │      0.0677       │      0.0541       │      0.0538       │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```
