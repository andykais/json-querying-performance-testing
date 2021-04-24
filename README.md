# Json Querying Performance Testing

This repo is used to test the performance of json querying npm packages. The dataset used is [City Lots San Francisco in .json](https://github.com/zemirco/sf-city-lots-json).
The libraries tested are:

| Package                                                              | NPM Downloads                                                                                                  | Last commit                                                                                        |
| :--                                                                  | :--                                                                                                            | :--                                                                                                |
| [json-query](https://www.npmjs.com/package/json-query)               | [![npm](https://img.shields.io/npm/dw/json-query.svg)](https://www.npmjs.com/package/json-query)               | ![GitHub last commit](https://img.shields.io/github/last-commit/mmckegg/json-query.svg)            |
| [jsonpath-plus](https://www.npmjs.com/package/jsonpath-plus)         | [![npm](https://img.shields.io/npm/dw/jsonpath-plus.svg)](https://www.npmjs.com/package/jsonpath-plus)         | ![GitHub last commit](https://img.shields.io/github/last-commit/s3u/JSONPath.svg)                  |
| [jsonpath](https://www.npmjs.com/package/jsonpath)                   | [![npm](https://img.shields.io/npm/dw/jsonpath.svg)](https://www.npmjs.com/package/jsonpath)                   | ![GitHub last commit](https://img.shields.io/github/last-commit/dchester/jsonpath.svg)             |
| [js-json-go](https://www.npmjs.com/package/js-json-go)                   | [![npm](https://img.shields.io/npm/dw/js-json-go.svg)](https://www.npmjs.com/package/jg-json-go)                   | ![GitHub last commit](https://img.shields.io/github/last-commit/JG-1202/js-json-go.svg)             |
| [JSONStream](https://www.npmjs.com/package/JSONStream)               | [![npm](https://img.shields.io/npm/dw/JSONStream.svg)](https://www.npmjs.com/package/JSONStream)               | ![GitHub last commit](https://img.shields.io/github/last-commit/dominictarr/JSONStream.svg)        |
| [oboe](https://www.npmjs.com/package/oboe)                           | [![npm](https://img.shields.io/npm/dw/oboe.svg)](https://www.npmjs.com/package/oboe)                           | ![GitHub last commit](https://img.shields.io/github/last-commit/jimhigson/oboe.js.svg)             |
| [map-filter-reduce](https://www.npmjs.com/package/map-filter-reduce) | [![npm](https://img.shields.io/npm/dw/map-filter-reduce.svg)](https://www.npmjs.com/package/map-filter-reduce) | ![GitHub last commit](https://img.shields.io/github/last-commit/dominictarr/map-filter-reduce.svg) |

`jsonpath-plus` and `jsonpath` use the [XPath for Json Specification](https://goessner.net/articles/JsonPath).
`json-query` and `js-json-go` have its own custom DSL. `JSONStream`, `oboe`, and `map-filter-reduce` are streaming libraries, though I've had varying success in making them anywhere near as performant.

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

Ran using Macbook Pro, 2,9 GHz Dual-Core Intel Core i5, 8 GB 2133 MHz LPDDR3

```
$ npm run perf

> perf-json-querying@1.0.1 perf /Users/user/json-querying-performance-testing-master
> node --max-old-space-size=4096 src

smallCityLots 49998 items.
mediumCityLots 99998 items.
largeCityLots 206560 items.

smallCityLots:
- json-query:
  - shallow took 0.0146 seconds.
  - deep took 0.0326 seconds.
  - conditional took 0.023 seconds.
- jsonpath-plus:
  - shallow took 0.4832 seconds.
  - deep took 0.4658 seconds.
  - conditional took 0.3347 seconds.
- jsonpath:
  - shallow took 1.094 seconds.
  - deep took 8.6515 seconds.
  - conditional took 0.0299 seconds.
- js-json-go:
  - shallow took 0.0256 seconds.
  - deep took 0.0398 seconds.
  - conditional took 0.1533 seconds.
- JSONStream:
  - shallow took 3.0701 seconds.
  - deep took 3.2552 seconds.
- oboe:
  - shallow took 3.898 seconds.
  - deep took 4.1545 seconds.
- map-filter-reduce:

mediumCityLots:
- json-query:
  - shallow took 0.0773 seconds.
  - deep took 0.092 seconds.
  - conditional took 0.0358 seconds.
- jsonpath-plus:
  - shallow took 0.9456 seconds.
  - deep took 0.9424 seconds.
  - conditional took 0.677 seconds.
- jsonpath:
  - shallow took 2.2628 seconds.
  - deep took 37.9562 seconds.
  - conditional took 0.0533 seconds.
- js-json-go:
  - shallow took 0.0503 seconds.
  - deep took 0.0466 seconds.
  - conditional took 0.218 seconds.
- JSONStream:
  - shallow took 5.4356 seconds.
  - deep took 6.2937 seconds.
- oboe:
  - shallow took 8.3065 seconds.
  - deep took 8.7172 seconds.
- map-filter-reduce:

largeCityLots:
- json-query:
json-query shallow failed, RangeError: Maximum call stack size exceeded.
json-query deep failed, RangeError: Maximum call stack size exceeded.
json-query conditional failed, RangeError: Maximum call stack size exceeded.
- jsonpath-plus:
  - shallow took 2.6208 seconds.
  - deep took 2.7371 seconds.
  - conditional took 1.4626 seconds.
- jsonpath:
  - shallow took 7.0133 seconds.
  - deep took 166.297 seconds.
  - conditional took 0.1198 seconds.
- js-json-go:
  - shallow took 0.0926 seconds.
  - deep took 0.0784 seconds.
  - conditional took 0.443 seconds.
- JSONStream:
  - shallow took 16.8393 seconds.
  - deep took 17.5634 seconds.
- oboe:
  - shallow took 21.9919 seconds.
  - deep took 27.0612 seconds.
- map-filter-reduce:



summary:

smallCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0146       │      0.0326       │       0.023       │
│   jsonpath-plus   │      0.4832       │      0.4658       │      0.3347       │
│     jsonpath      │       1.094       │      8.6515       │      0.0299       │
│    js-json-go     │      0.0256       │      0.0398       │      0.1533       │
│    JSONStream     │      3.0701       │      3.2552       │  'not possible'   │
│       oboe        │       3.898       │      4.1545       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
mediumCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0773       │       0.092       │      0.0358       │
│   jsonpath-plus   │      0.9456       │      0.9424       │       0.677       │
│     jsonpath      │      2.2628       │      37.9562      │      0.0533       │
│    js-json-go     │      0.0503       │      0.0466       │       0.218       │
│    JSONStream     │      5.4356       │      6.2937       │  'not possible'   │
│       oboe        │      8.3065       │      8.7172       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
largeCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │     'failed'      │     'failed'      │     'failed'      │
│   jsonpath-plus   │      2.6208       │      2.7371       │      1.4626       │
│     jsonpath      │      7.0133       │      166.297      │      0.1198       │
│    js-json-go     │      0.0926       │      0.0784       │       0.443       │
│    JSONStream     │      16.8393      │      17.5634      │  'not possible'   │
│       oboe        │      21.9919      │      27.0612      │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```