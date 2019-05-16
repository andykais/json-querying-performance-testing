const oboe = require('oboe')
const CityLotsORM = require('./base-class')
const { NotPossibleError } = require('../errors')
const objectToStream = require('../object-to-stream')

const { performance } = require('perf_hooks')
class OboeCity extends CityLotsORM {
  setup() {
    this.jsonStream = objectToStream(this.data)
  }
  cleanup() {
    this.jsonStream = null
  }
  execute(query) {
    return new Promise((resolve, reject) => {
      const result = []
      oboe(this.jsonStream)
        .node(query, data => {
          result.push(data)
        })
        .on('done', () => resolve(result))
        .on('fail', reject)
    })
  }
  shallow() {
    return this.execute('features.*.properties')
  }
  deep() {
    return this.execute('features.*.properties.BLOCK_NUM')
  }
  conditional() {
    // oboe does not support conditionals
    throw new NotPossibleError()
  }
}

module.exports = OboeCity
