const mfr = require('map-filter-reduce')
const CityLotsORM = require('./base-class')
const objectToStream = require('../object-to-stream')
const pull = require('pull-stream')

class MapFilterReduceCity extends CityLotsORM {
  setup() {
    this.jsonStream = objectToStream(this.data)
  }
  cleanup() {
    this.jsonStream = null
  }
  execute(query) {
    return new Promise((resolve, reject) => {
      const result = []
      pull(
        pull.values([this.data]), // pull must except an array (the same is probably true for mfr)
        mfr(query),
        pull.collect((error, results) => {
          if (error) reject(error)
          else resolve(results)
        })
      )
    })
  }
  // shallow() {
  //   return this.execute([
  //     { $map: 'features' },
  //     { $map: 'properties' } // it appears maps cannot be chains at the moment
  //   ])
  // }
  // deep() {
  //   return []
  // }
  // conditional() {
  //   return []
  // }
}

module.exports = MapFilterReduceCity
