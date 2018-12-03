const JSONStream = require('JSONStream')
const CityLotsORM = require('./base-class')
const objectToStream = require('../object-to-stream')

const { performance } = require('perf_hooks')
class JSONStreamCity extends CityLotsORM {
  execute(query) {
    return new Promise((resolve, reject) => {
      const jsonStream = objectToStream(this.data).pipe(JSONStream.parse(query))
      const result = []
      jsonStream.on('data', data => {
        result.push(data)
      })
      jsonStream.on('close', () => resolve(result))
      jsonStream.on('error', reject)
    })
  }
  shallow() {
    return this.execute('features..properties')
  }
  deep() {
    return this.execute('features..properties.BLOCK_NUM')
  }
  conditional() {
    return this.execute(
      `features[?(@.properties.STREET=='UNKNOWN')].properties.BLOCK_NUM`
    )
  }
}

module.exports = JSONStreamCity
