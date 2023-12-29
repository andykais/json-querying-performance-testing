const jmespath = require('jmespath')
const CityLotsORM = require('./base-class')

class JmespathCity extends CityLotsORM {
  execute(query) {
    return jmespath.search(this.data, query)
  }
  shallow() {
    return this.execute('features[*].properties')
  }
  deep() {
    return this.execute('features[*].properties.BLOCK_NUM')
  }
  conditional() {
    return this.execute(
      `features[?(properties.STREET == 'UNKNOWN')].properties.BLOCK_NUM`
    )
  }
}

module.exports = JmespathCity
