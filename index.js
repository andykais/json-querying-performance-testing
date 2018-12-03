const { PerformanceObserver, performance } = require('perf_hooks')

const { JSONPath } = require('jsonpath-plus')
const jp = require('jsonpath')
const jsonQuery = require('json-query')

const largeCityLots = require('./citylots.json')
const mediumCityLots = require('./medium-citylots.json')
const smallCityLots = require('./small-citylots.json')

class CityLotsORM {
  constructor(data) {
    this.data = data
  }
  shallow() {
    throw new Error()
  }
  deep() {
    throw new Error()
  }
}

// json-query
class JsonQueryCity extends CityLotsORM {
  deep() {
    return jsonQuery('features.properties.BLOCK_NUM', { data: this.data })
  }
  shallow() {
    return jsonQuery('features.properties', { data: this.data })
  }
}
// jsonpath
class JsonPathCity extends CityLotsORM {
  deep() {
    return jp.query(this.data, '$.features..properties.BLOCK_NUM')
  }
  shallow() {
    return jp.query(this.data, '$.features..properties')
  }
}
// jsonpath-plus
class JsonPathPlusCity extends CityLotsORM {
  deep() {
    return JSONPath({
      path: '$.features..properties.BLOCK_NUM',
      json: this.data
    })
  }
  shallow() {
    return JSONPath({
      path: '$.features..properties',
      json: this.data
    })
  }
}

const performanceClasses = {
  'json-query': JsonQueryCity,
  'jsonpath-plus': JsonPathPlusCity,
  jsonpath: JsonPathCity
}

const perf = (perfClasses, datasets, methods) => {
  const datasetPerf = {}
  for (const [name, dataset] of Object.entries(datasets)) {
    console.log(`${name}:`)
    datasetPerf[name] = {}
    for (const classKey of Object.keys(perfClasses)) {
      datasetPerf[name][classKey] = {}
      console.log(`- ${classKey}:`)
      const accessClass = new perfClasses[classKey](dataset)
      for (const method of methods) {
        try {
          const start = performance.now()
          const result = accessClass[method]()
          const stop = performance.now()
          const seconds = (stop - start) / 1e3
          datasetPerf[name][classKey][method] = Number(seconds.toFixed(4))
          console.log(
            `  - ${method} took ${datasetPerf[name][classKey][method]} seconds.`
          )
          // console.log({ result })
        } catch (e) {
          console.log(`${classKey} ${method} failed.`)
          datasetPerf[name][classKey][method] = 'failed'
        }
      }
    }
    console.log()
  }

  return datasetPerf
}
const logPerf = datasetPerf => {
  for (const [datasetName, dataset] of Object.entries(datasetPerf)) {
    console.log(datasetName)
    console.table(dataset)
  }
}

const datasets = {
  smallCityLots,
  mediumCityLots,
  largeCityLots
}

Object.entries(datasets).forEach(([name, dataset]) => {
  console.log(name, dataset.features.length, 'items.')
})
console.log()

const datasetPerf = perf(performanceClasses, datasets, ['shallow', 'deep'])

logPerf(datasetPerf)
