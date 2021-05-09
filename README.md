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
  - shallow took 0.0193 seconds.
  - deep took 0.0178 seconds.
  - conditional took 0.0161 seconds.
- json-power-query:
  - shallow took 0.0066 seconds.
  - deep took 0.0059 seconds.
  - conditional took 0.0081 seconds.
- jsonpath-plus:
  - shallow took 0.3602 seconds.
  - deep took 0.3547 seconds.
  - conditional took 0.3123 seconds.
- jsonpath:
  - shallow took 0.9105 seconds.
  - deep took 5.5777 seconds.
  - conditional took 0.0223 seconds.
- JSONStream:
  - shallow took 2.1767 seconds.
  - deep took 2.2236 seconds.
- oboe:
  - shallow took 2.6634 seconds.
  - deep took 2.8611 seconds.
- map-filter-reduce:

mediumCityLots:
- json-query:
  - shallow took 0.0145 seconds.
  - deep took 0.0201 seconds.
  - conditional took 0.017 seconds.
- json-power-query:
  - shallow took 0.0061 seconds.
  - deep took 0.0071 seconds.
  - conditional took 0.0091 seconds.
- jsonpath-plus:
  - shallow took 0.732 seconds.
  - deep took 0.7544 seconds.
  - conditional took 0.7108 seconds.
- jsonpath:
  - shallow took 1.9381 seconds.
  - deep took 21.0531 seconds.
  - conditional took 0.0373 seconds.
- JSONStream:
  - shallow took 4.4559 seconds.
  - deep took 4.734 seconds.
- oboe:
  - shallow took 6.2294 seconds.
  - deep took 5.6633 seconds.
- map-filter-reduce:

largeCityLots:
- json-query:
json-query shallow failed, RangeError: Maximum call stack size exceeded.
json-query deep failed, RangeError: Maximum call stack size exceeded.
json-query conditional failed, RangeError: Maximum call stack size exceeded.
- json-power-query:
  - shallow took 0.0281 seconds.
  - deep took 0.0335 seconds.
  - conditional took 0.2713 seconds.
- jsonpath-plus:
  - shallow took 2.0309 seconds.
  - deep took 2.0961 seconds.
  - conditional took 1.3241 seconds.
- jsonpath:
  - shallow took 5.5157 seconds.
  - deep took 90.6215 seconds.
  - conditional took 0.075 seconds.
- JSONStream:
  - shallow took 13.06 seconds.
  - deep took 13.5694 seconds.
- oboe:
  - shallow took 16.0373 seconds.
  - deep took 17.4425 seconds.
- map-filter-reduce:



summary:

smallCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0193       │      0.0178       │      0.0161       │
│ json-power-query  │      0.0066       │      0.0059       │      0.0081       │
│   jsonpath-plus   │      0.3602       │      0.3547       │      0.3123       │
│     jsonpath      │      0.9105       │      5.5777       │      0.0223       │
│    JSONStream     │      2.1767       │      2.2236       │  'not possible'   │
│       oboe        │      2.6634       │      2.8611       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
mediumCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │      0.0145       │      0.0201       │       0.017       │
│ json-power-query  │      0.0061       │      0.0071       │      0.0091       │
│   jsonpath-plus   │       0.732       │      0.7544       │      0.7108       │
│     jsonpath      │      1.9381       │      21.0531      │      0.0373       │
│    JSONStream     │      4.4559       │       4.734       │  'not possible'   │
│       oboe        │      6.2294       │      5.6633       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
largeCityLots
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      (index)      │      shallow      │       deep        │    conditional    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│    json-query     │     'failed'      │     'failed'      │     'failed'      │
│ json-power-query  │      0.0281       │      0.0335       │      0.2713       │
│   jsonpath-plus   │      2.0309       │      2.0961       │      1.3241       │
│     jsonpath      │      5.5157       │      90.6215      │       0.075       │
│    JSONStream     │       13.06       │      13.5694      │  'not possible'   │
│       oboe        │      16.0373      │      17.4425      │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```
