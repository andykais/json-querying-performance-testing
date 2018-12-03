# Json Querying Performance Testing

This repo is used to test the performance of json querying npm packages. The dataset used is [City Lots San
Francisco in .json](https://github.com/zemirco/sf-city-lots-json). The three libraries tested are:

- [json-query](https://www.npmjs.com/package/json-query) [![npm](https://img.shields.io/npm/dw/json-query.svg)](https://www.npmjs.com/package/json-query)
- [jsonpath-plus](https://www.npmjs.com/package/jsonpath-plus) [![npm](https://img.shields.io/npm/dw/jsonpath-plus.svg)](https://www.npmjs.com/package/jsonpath-plus)
- [jsonpath](https://www.npmjs.com/package/jsonpath) [![npm](https://img.shields.io/npm/dw/jsonpath.svg)](https://www.npmjs.com/package/jsonpath)

`jsonpath-plus` and `jsonpath` use the [XPath for Json
Specification](https://goessner.net/articles/JsonPath/), while `json-query` has its own custom DSL.

## How to run
```
npm install
npm run perf
```

## Results
Ran using Macbook Pro, 2.2 GHz Intel Core i7, 16 GB 2400 MHz DDR4

```
smallCityLots 49998 items.
mediumCityLots 99998 items.
largeCityLots 206560 items.

smallCityLots:
- json-query:
  - shallow took 0.0163 seconds.
  - deep took 0.0272 seconds.
- jsonpath-plus:
  - shallow took 0.4007 seconds.
  - deep took 0.3859 seconds.
- jsonpath:
  - shallow took 0.9877 seconds.
  - deep took 5.6115 seconds.

mediumCityLots:
- json-query:
  - shallow took 0.0453 seconds.
  - deep took 0.0672 seconds.
- jsonpath-plus:
  - shallow took 1.1911 seconds.
  - deep took 0.8447 seconds.
- jsonpath:
  - shallow took 2.0904 seconds.
  - deep took 38.5769 seconds.

largeCityLots:
- json-query:
json-query shallow failed.
json-query deep failed.
- jsonpath-plus:
  - shallow took 1.8768 seconds.
  - deep took 1.9632 seconds.
- jsonpath:
  - shallow took 5.4765 seconds.
  - deep took 202.1378 seconds.

smallCityLots
┌───────────────┬─────────┬────────┐
│    (index)    │ shallow │  deep  │
├───────────────┼─────────┼────────┤
│  json-query   │ 0.0163  │ 0.0272 │
│ jsonpath-plus │ 0.4007  │ 0.3859 │
│   jsonpath    │ 0.9877  │ 5.6115 │
└───────────────┴─────────┴────────┘
mediumCityLots
┌───────────────┬─────────┬─────────┐
│    (index)    │ shallow │  deep   │
├───────────────┼─────────┼─────────┤
│  json-query   │ 0.0453  │ 0.0672  │
│ jsonpath-plus │ 1.1911  │ 0.8447  │
│   jsonpath    │ 2.0904  │ 38.5769 │
└───────────────┴─────────┴─────────┘
largeCityLots
┌───────────────┬──────────┬──────────┐
│    (index)    │ shallow  │   deep   │
├───────────────┼──────────┼──────────┤
│  json-query   │ 'failed' │ 'failed' │
│ jsonpath-plus │  1.8768  │  1.9632  │
│   jsonpath    │  5.4765  │ 202.1378 │
└───────────────┴──────────┴──────────┘
```
