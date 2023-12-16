# Json Querying Performance Testing

This repo is used to test the performance of json querying npm packages. The dataset used is [City Lots San Francisco in .json](https://github.com/zemirco/sf-city-lots-json).
The libraries tested are:

| Package                                                              | NPM Downloads                                                                                                  | Last commit                                                                                        |
| :--                                                                  | :--                                                                                                            | :--                                                                                                |
| [json-query](https://www.npmjs.com/package/json-query)               | [![npm](https://img.shields.io/npm/dw/json-query.svg)](https://www.npmjs.com/package/json-query)               | ![GitHub last commit](https://img.shields.io/github/last-commit/mmckegg/json-query.svg)            |
| [jsonpath-plus](https://www.npmjs.com/package/jsonpath-plus)         | [![npm](https://img.shields.io/npm/dw/jsonpath-plus.svg)](https://www.npmjs.com/package/jsonpath-plus)         | ![GitHub last commit](https://img.shields.io/github/last-commit/s3u/JSONPath.svg)                  |
| [jsonpath](https://www.npmjs.com/package/jsonpath)                   | [![npm](https://img.shields.io/npm/dw/jsonpath.svg)](https://www.npmjs.com/package/jsonpath)                   | ![GitHub last commit](https://img.shields.io/github/last-commit/dchester/jsonpath.svg)             |
| [json-p3](https://www.npmjs.com/package/json-p3) | [![npm](https://img.shields.io/npm/dw/json-p3.svg)](https://www.npmjs.com/package/json-p3) | ![GitHub last commit](https://img.shields.io/github/last-commit/jg-rp/json-p3.svg) |
| [js-json-go](https://www.npmjs.com/package/js-json-go) | [![npm](https://img.shields.io/npm/dw/js-json-go.svg)](https://www.npmjs.com/package/jg-json-go) | ![GitHub last commit](https://img.shields.io/github/last-commit/JG-1202/js-json-go.svg) |
| [json-power-query](https://www.npmjs.com/package/json-power-query) | [![npm](https://img.shields.io/npm/dw/json-power-query.svg)](https://www.npmjs.com/package/json-power-query) | ![GitHub last commit](https://img.shields.io/github/last-commit/TotalTechGeek/json-power-query.svg) |
| [JSONStream](https://www.npmjs.com/package/JSONStream)               | [![npm](https://img.shields.io/npm/dw/JSONStream.svg)](https://www.npmjs.com/package/JSONStream)               | ![GitHub last commit](https://img.shields.io/github/last-commit/dominictarr/JSONStream.svg)        |
| [oboe](https://www.npmjs.com/package/oboe)                           | [![npm](https://img.shields.io/npm/dw/oboe.svg)](https://www.npmjs.com/package/oboe)                           | ![GitHub last commit](https://img.shields.io/github/last-commit/jimhigson/oboe.js.svg)             |
| [map-filter-reduce](https://www.npmjs.com/package/map-filter-reduce) | [![npm](https://img.shields.io/npm/dw/map-filter-reduce.svg)](https://www.npmjs.com/package/map-filter-reduce) | ![GitHub last commit](https://img.shields.io/github/last-commit/jg-rp/json-p3.svg) |

`jsonpath-plus` and `jsonpath` use the [XPath for Json Specification](https://goessner.net/articles/JsonPath).
`json-query`, `json-p3` and `json-js-go` has its own custom DSL. `JSONStream`, `oboe`, and `map-filter-reduce` are streaming libraries, though I've had varying success in making them anywhere near as performant.

## How to run

```
pnpm install
pnpm run perf
```

### Method Explaination

The performance test runs three queries on each of the libraries. All three queries are defined in
[src/index.js](./src/index.js) though the actual syntax varies slightly between them.

- `shallow` returns an object inside an array
- `deep` returns a string from the object inside the array
- `conditional` filters the results based on which lots have an 'UNKNOWN' street name, then returns an array
  of coordinates from inside the object

### Results

Ran using Macbook Pro, Apple M2 Max 12c, 32GB RAM, Node v21.4.0

```
$ pnpm run perf

> perf-json-querying@1.0.0 perf /Users/jbergstroem/wrk/oss/json-querying-performance-testing
> node --max-old-space-size=4096 --expose-gc src

smallCityLots 49998 items.
mediumCityLots 99998 items.
largeCityLots 206560 items.

smallCityLots:
- json-query:
  - shallow took 0.0047 seconds.
  - deep took 0.0048 seconds.
  - conditional took 0.0062 seconds.
- jsonpath-plus:
  - shallow took 0.1355 seconds.
  - deep took 0.1339 seconds.
  - conditional took 0.0342 seconds.
- jsonpath:
  - shallow took 0.3711 seconds.
  - deep took 2.3432 seconds.
  - conditional took 0.0116 seconds.
- json-p3:
  - shallow took 0.6913 seconds.
  - deep took 0.5962 seconds.
  - conditional took 0.029 seconds.
- js-json-go:
  - shallow took 0.0434 seconds.
  - deep took 0.0399 seconds.
  - conditional took 0.0616 seconds.
- json-power-query:
  - shallow took 0.0029 seconds.
  - deep took 0.0028 seconds.
  - conditional took 0.0037 seconds.
- JSONStream:
  - shallow took 0.9522 seconds.
  - deep took 0.9774 seconds.
- oboe:
  - shallow took 1.1483 seconds.
  - deep took 1.1847 seconds.
- map-filter-reduce:

mediumCityLots:
- json-query:
  - shallow took 0.0055 seconds.
  - deep took 0.0091 seconds.
  - conditional took 0.0083 seconds.
- jsonpath-plus:
  - shallow took 0.2546 seconds.
  - deep took 0.272 seconds.
  - conditional took 0.0593 seconds.
- jsonpath:
  - shallow took 0.7684 seconds.
  - deep took 8.2911 seconds.
  - conditional took 0.0192 seconds.
- json-p3:
  - shallow took 1.4808 seconds.
  - deep took 1.2317 seconds.
  - conditional took 0.0475 seconds.
- js-json-go:
  - shallow took 0.0712 seconds.
  - deep took 0.0634 seconds.
  - conditional took 0.1034 seconds.
- json-power-query:
  - shallow took 0.0051 seconds.
  - deep took 0.0044 seconds.
  - conditional took 0.0038 seconds.
- JSONStream:
  - shallow took 2.0166 seconds.
  - deep took 2.048 seconds.
- oboe:
  - shallow took 2.4415 seconds.
  - deep took 2.4524 seconds.
- map-filter-reduce:

largeCityLots:
- json-query:
json-query shallow failed, RangeError: Maximum call stack size exceeded.
json-query deep failed, RangeError: Maximum call stack size exceeded.
json-query conditional failed, RangeError: Maximum call stack size exceeded.
- jsonpath-plus:
  - shallow took 0.7001 seconds.
  - deep took 0.7331 seconds.
  - conditional took 0.1226 seconds.
- jsonpath:
  - shallow took 2.1981 seconds.
   - deep took 33.633 seconds.
  - conditional took 0.0452 seconds.
- json-p3:
  - shallow took 5.3844 seconds.
  - deep took 5.3054 seconds.
  - conditional took 0.1007 seconds.
- js-json-go:
  - shallow took 0.1173 seconds.
  - deep took 0.12 seconds.
  - conditional took 0.2242 seconds.
- json-power-query:
  - shallow took 0.0117 seconds.
  - deep took 0.0113 seconds.
  - conditional took 0.0093 seconds.
- JSONStream:
  - shallow took 6.0252 seconds.
  - deep took 6.0345 seconds.
- oboe:
  - shallow took 7.341 seconds.
  - deep took 7.2204 seconds.
- map-filter-reduce:



summary:

smallCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│ (index)           │ shallow           │ deep              │ conditional       │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ json-query        │ 0.0047            │ 0.0048            │ 0.0062            │
│ jsonpath-plus     │ 0.1355            │ 0.1339            │ 0.0342            │
│ jsonpath          │ 0.3711            │ 2.3432            │ 0.0116            │
│ json-p3           │ 0.6913            │ 0.5962            │ 0.029             │
│ js-json-go        │ 0.0434            │ 0.0399            │ 0.0616            │
│ json-power-query  │ 0.0029            │ 0.0028            │ 0.0037            │
│ JSONStream        │ 0.9522            │ 0.9774            │ 'not possible'    │
│ oboe              │ 1.1483            │ 1.1847            │ 'not possible'    │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
mediumCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│ (index)           │ shallow           │ deep              │ conditional       │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ json-query        │ 0.0055            │ 0.0091            │ 0.0083            │
│ jsonpath-plus     │ 0.2546            │ 0.272             │ 0.0593            │
│ jsonpath          │ 0.7684            │ 8.2911            │ 0.0192            │
│ json-p3           │ 1.4808            │ 1.2317            │ 0.0475            │
│ js-json-go        │ 0.0712            │ 0.0634            │ 0.1034            │
│ json-power-query  │ 0.0051            │ 0.0044            │ 0.0038            │
│ JSONStream        │ 2.0166            │ 2.048             │ 'not possible'    │
│ oboe              │ 2.4415            │ 2.4524            │ 'not possible'    │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
largeCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│ (index)           │ shallow           │ deep              │ conditional       │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ json-query        │ 'failed'          │ 'failed'          │ 'failed'          │
│ jsonpath-plus     │ 0.7001            │ 0.7331            │ 0.1226            │
│ jsonpath          │ 2.1981            │ 33.633            │ 0.0452            │
│ json-p3           │ 5.3844            │ 5.3054            │ 0.1007            │
│ js-json-go        │ 0.1173            │ 0.12              │ 0.2242            │
│ json-power-query  │ 0.0117            │ 0.0113            │ 0.0093            │
│ JSONStream        │ 6.0252            │ 6.0345            │ 'not possible'    │
│ oboe              │ 7.341             │ 7.2204            │ 'not possible'    │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```
