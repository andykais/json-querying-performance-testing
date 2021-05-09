# Json Querying Performance Testing

This repo is used to test the performance of json querying npm packages. The dataset used is [City Lots San Francisco in .json](https://github.com/zemirco/sf-city-lots-json).
The libraries tested are:

| Package                                                              | NPM Downloads                                                                                                  | Last commit                                                                                        |
| :--                                                                  | :--                                                                                                            | :--                                                                                                |
| [json-query](https://www.npmjs.com/package/json-query)               | [![npm](https://img.shields.io/npm/dw/json-query.svg)](https://www.npmjs.com/package/json-query)               | ![GitHub last commit](https://img.shields.io/github/last-commit/mmckegg/json-query.svg)            |
| [jsonpath-plus](https://www.npmjs.com/package/jsonpath-plus)         | [![npm](https://img.shields.io/npm/dw/jsonpath-plus.svg)](https://www.npmjs.com/package/jsonpath-plus)         | ![GitHub last commit](https://img.shields.io/github/last-commit/s3u/JSONPath.svg)                  |
| [jsonpath](https://www.npmjs.com/package/jsonpath)                   | [![npm](https://img.shields.io/npm/dw/jsonpath.svg)](https://www.npmjs.com/package/jsonpath)                   | ![GitHub last commit](https://img.shields.io/github/last-commit/dchester/jsonpath.svg)             |
| [json-power-query](https://www.npmjs.com/package/json-power-query)                   | [![npm](https://img.shields.io/npm/dw/json-power-query.svg)](https://www.npmjs.com/package/json-power-query)                   | ![GitHub last commit](https://img.shields.io/github/last-commit/TotalTechGeek/json-power-query.svg)             |
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
> node --max-old-space-size=4096 --expose-gc src

smallCityLots 49998 items.
mediumCityLots 99998 items.
largeCityLots 206560 items.

smallCityLots:
- json-query:
  - shallow took 0.0087 seconds.
  - deep took 0.0136 seconds.
  - conditional took 0.0213 seconds.
- jsonpath-plus:
  - shallow took 0.3832 seconds.
  - deep took 0.3916 seconds.
  - conditional took 0.3685 seconds.
- jsonpath:
  - shallow took 0.9513 seconds.
  - deep took 5.5776 seconds.
  - conditional took 0.04 seconds.
- json-power-query:
  - shallow took 0.0053 seconds.
  - deep took 0.0057 seconds.
  - conditional took 0.0077 seconds.
- JSONStream:
  - shallow took 2.2002 seconds.
  - deep took 2.2644 seconds.
- oboe:
  - shallow took 2.7596 seconds.
  - deep took 2.8447 seconds.
- map-filter-reduce:

mediumCityLots:
- json-query:
  - shallow took 0.016 seconds.
  - deep took 0.0309 seconds.
  - conditional took 0.0255 seconds.
- jsonpath-plus:
  - shallow took 0.7571 seconds.
  - deep took 0.8095 seconds.
  - conditional took 0.6889 seconds.
- jsonpath:
  - shallow took 1.9249 seconds.
  - deep took 20.8872 seconds.
  - conditional took 0.0761 seconds.
- json-power-query:
  - shallow took 0.0075 seconds.
  - deep took 0.01 seconds.
  - conditional took 0.0087 seconds.
- JSONStream:
  - shallow took 4.5227 seconds.
  - deep took 4.6853 seconds.
- oboe:
  - shallow took 5.7411 seconds.
  - deep took 5.9309 seconds.
- map-filter-reduce:

largeCityLots:
- json-query:
json-query shallow failed, RangeError: Maximum call stack size exceeded.
json-query deep failed, RangeError: Maximum call stack size exceeded.
json-query conditional failed, RangeError: Maximum call stack size exceeded.
- jsonpath-plus:
  - shallow took 1.9852 seconds.
  - deep took 2.0817 seconds.
  - conditional took 1.5008 seconds.
- jsonpath:
  - shallow took 5.4554 seconds.
  - deep took 88.787 seconds.
  - conditional took 0.15 seconds.
- json-power-query:
  - shallow took 0.0109 seconds.
  - deep took 0.0127 seconds.
  - conditional took 0.0143 seconds.
- JSONStream:
  - shallow took 12.8073 seconds.
  - deep took 13.0806 seconds.
- oboe:
  - shallow took 16.3094 seconds.
  - deep took 17.728 seconds.
- map-filter-reduce:



summary:

smallCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0087       │      0.0136       │      0.0213       │
│   jsonpath-plus   │      0.3832       │      0.3916       │      0.3685       │
│     jsonpath      │      0.9513       │      5.5776       │       0.04        │
│ json-power-query  │      0.0053       │      0.0057       │      0.0077       │
│    JSONStream     │      2.2002       │      2.2644       │  'not possible'   │
│       oboe        │      2.7596       │      2.8447       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
mediumCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │       0.016       │      0.0309       │      0.0255       │
│   jsonpath-plus   │      0.7571       │      0.8095       │      0.6889       │
│     jsonpath      │      1.9249       │      20.8872      │      0.0761       │
│ json-power-query  │      0.0075       │       0.01        │      0.0087       │
│    JSONStream     │      4.5227       │      4.6853       │  'not possible'   │
│       oboe        │      5.7411       │      5.9309       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
largeCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │     'failed'      │     'failed'      │     'failed'      │
│   jsonpath-plus   │      1.9852       │      2.0817       │      1.5008       │
│     jsonpath      │      5.4554       │      88.787       │       0.15        │
│ json-power-query  │      0.0109       │      0.0127       │      0.0143       │
│    JSONStream     │      12.8073      │      13.0806      │  'not possible'   │
│       oboe        │      16.3094      │      17.728       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```
