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
  - shallow took 0.0176 seconds.
  - deep took 0.0502 seconds.
  - conditional took 0.0408 seconds.
- jsonpath-plus:
  - shallow took 0.4146 seconds.
  - deep took 0.4239 seconds.
  - conditional took 0.326 seconds.
- jsonpath:
  - shallow took 1.1165 seconds.
  - deep took 4.4373 seconds.
  - conditional took 0.1387 seconds.
- JSONStream:
  - shallow took 20.5 seconds.
  - deep took 23.5372 seconds.
- oboe:
  - shallow took 25.0891 seconds.
  - deep took 32.5883 seconds.
- map-filter-reduce:

mediumCityLots:
- json-query:
  - shallow took 0.0489 seconds.
  - deep took 0.0732 seconds.
  - conditional took 0.0488 seconds.
- jsonpath-plus:
  - shallow took 0.8285 seconds.
  - deep took 0.8567 seconds.
  - conditional took 0.6074 seconds.
- jsonpath:
  - shallow took 2.2047 seconds.
  - deep took 37.187 seconds.
  - conditional took 0.2852 seconds.
- JSONStream:
  - shallow took 199.4793 seconds.
  - deep took 5.0332 seconds.
- oboe:
  - shallow took 27.819 seconds.
  - deep took 77.9259 seconds.
- map-filter-reduce:

largeCityLots:
- json-query:
json-query shallow failed, RangeError: Maximum call stack size exceeded.
json-query deep failed, RangeError: Maximum call stack size exceeded.
json-query conditional failed, RangeError: Maximum call stack size exceeded.
- jsonpath-plus:
  - shallow took 2.3345 seconds.
  - deep took 2.472 seconds.
  - conditional took 3.1351 seconds.
- jsonpath:
  - shallow took 8.509 seconds.
  - deep took 252.9623 seconds.
  - conditional took 0.7586 seconds.
- JSONStream:
  - shallow took 54.8295 seconds.
  - deep took 146.2962 seconds.
- oboe:
  - shallow took 148.8824 seconds.
  - deep took 216.7555 seconds.
- map-filter-reduce:



summary:

smallCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0176       │      0.0502       │      0.0408       │
│   jsonpath-plus   │      0.4146       │      0.4239       │       0.326       │
│     jsonpath      │      1.1165       │      4.4373       │      0.1387       │
│    JSONStream     │       20.5        │      23.5372      │  'not possible'   │
│       oboe        │      25.0891      │      32.5883      │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
mediumCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0489       │      0.0732       │      0.0488       │
│   jsonpath-plus   │      0.8285       │      0.8567       │      0.6074       │
│     jsonpath      │      2.2047       │      37.187       │      0.2852       │
│    JSONStream     │     199.4793      │      5.0332       │  'not possible'   │
│       oboe        │      27.819       │      77.9259      │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
largeCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │     'failed'      │     'failed'      │     'failed'      │
│   jsonpath-plus   │      2.3345       │       2.472       │      3.1351       │
│     jsonpath      │       8.509       │     252.9623      │      0.7586       │
│    JSONStream     │      54.8295      │     146.2962      │  'not possible'   │
│       oboe        │     148.8824      │     216.7555      │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```
