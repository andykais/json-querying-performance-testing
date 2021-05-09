const { performance } = require('perf_hooks')
const { NotPossibleError, UnImplementedError } = require('./errors')
const performanceClasses = {
  'json-query': require('./queriers/json-query'),
  'jsonpath-plus': require('./queriers/jsonpath-plus'),
  jsonpath: require('./queriers/jsonpath'),
  JSONStream: require('./queriers/JSONStream'),
  oboe: require('./queriers/oboe'),
  'map-filter-reduce': require('./queriers/map-filter-reduce'),
  'json-power-query': require('./queriers/json-power-query')
}
const datasets = {
  smallCityLots: {
    dataset: require('../datasets/small-citylots.json'),
    methodResults: {
      shallow: 49998,
      deep: 49998,
      conditional: 643
    }
  },
  mediumCityLots: {
    dataset: require('../datasets/medium-citylots.json'),
    methodResults: {
      shallow: 99998,
      deep: 99998,
      conditional: 824
    }
  },
  largeCityLots: {
    dataset: require('../datasets/citylots.json'),
    methodResults: {
      shallow: 206560,
      deep: 206560,
      conditional: 2843
    }
  }
}

const perf = (perfClasses, datasets) => async (
  testLibraries,
  testDatasets,
  testMethods
) => {
  const datasetPerf = {}
  for (const datasetName of testDatasets) {
    // for (const [name, { dataset, methodResults }] of Object.entries(datasets)) {
    const { dataset, methodResults } = datasets[datasetName]
    datasetPerf[datasetName] = {}
    console.log(`${datasetName}:`)
    for (const libName of testLibraries) {
      // for (const classKey of Object.keys(perfClasses)) {
      datasetPerf[datasetName][libName] = {}
      console.log(`- ${libName}:`)
      const accessClass = new perfClasses[libName](dataset)
      for (const method of testMethods) {
        try {
          await accessClass.setup()
          const start = performance.now()
          const result = await accessClass[method]()
          const stop = performance.now()
          accessClass.cleanup()
          const seconds = (stop - start) / 1e3
          datasetPerf[datasetName][libName][method] = Number(seconds.toFixed(4))
          console.log(
            `  - ${method} took ${
              datasetPerf[datasetName][libName][method]
            } seconds.`
          )
          if (result.length !== methodResults[method]) {
            e = new Error(
              `result should have length ${
                methodResults[method]
              } but instead is ${result.length}`
            )
            e.name = 'AssertError'
            throw e
          }
        } catch (e) {
          if (e instanceof NotPossibleError) {
            datasetPerf[datasetName][libName][method] = 'not possible'
          }
          else if (e instanceof UnImplementedError) {
            datasetPerf[datasetName][libName][method] = 'not implemented'
          }
          else if (e.name === 'AssertError') {
            console.error(`${libName} ${method} ${e}`)
            datasetPerf[datasetName][libName][method] = 'incorrect'
          } else {
            console.error(`${libName} ${method} failed, ${e}.`)
            // console.error(e)
            datasetPerf[datasetName][libName][method] = 'failed'
          }
        }
      }
    }
    console.log()
  }

  return datasetPerf
}
const logPerf = datasetPerf => {
  console.log('\n\nsummary:\n')
  for (const [datasetName, dataset] of Object.entries(datasetPerf)) {
    console.log(datasetName)
    console.table(dataset)
  }
}

Object.entries(datasets).forEach(([name, { dataset }]) => {
  console.log(name, dataset.features.length, 'items.')
})
console.log()

const testLibraries = [
  'json-query',
  'jsonpath-plus',
  'jsonpath',
  'JSONStream',
  'oboe',
  'json-power-query',
  'map-filter-reduce'
]
const testDatasets = [
  'smallCityLots',
  'mediumCityLots',
  'largeCityLots'
]
const testMethods = ['shallow', 'deep', 'conditional']
perf(performanceClasses, datasets)(
  testLibraries,
  testDatasets,
  testMethods
).then(logPerf)
