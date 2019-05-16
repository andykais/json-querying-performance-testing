const JSONStream = require('JSONStream')
const CityLotsORM = require('./base-class')
const objectToStream = require('../object-to-stream')
const { NotPossibleError } = require('../errors')

class JSONStreamCity extends CityLotsORM {
  setup() {
    this.jsonStream = objectToStream(this.data)
  }
  cleanup() {
    this.jsonStream = null
  }
  execute(query) {
    return new Promise((resolve, reject) => {
      const result = []
      this.jsonStream
        .pipe(JSONStream.parse(query))
        .on('data', data => {
          result.push(data)
        })
        .on('close', () => resolve(result))
        .on('error', reject)
    })
  }
  shallow() {
    return this.execute('features..properties')
  }
  deep() {
    return this.execute('features..properties.BLOCK_NUM')
  }
  conditional() {
    throw new NotPossibleError()
  }
}

module.exports = JSONStreamCity
