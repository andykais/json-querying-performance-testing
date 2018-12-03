const jp = require('jsonpath')
const CityLotsORM = require('./base-class')

class JsonPathCity extends CityLotsORM {
  execute(query) {
    return jp.query(this.data, query)
  }
  shallow() {
    return this.execute('$.features..properties')
  }
  deep() {
    return this.execute('$.features..properties.BLOCK_NUM')
  }
  conditional() {
    return this.execute(
      `$.features[?(@.properties.STREET=='UNKNOWN')].properties.BLOCK_NUM`
    )
  }
}

module.exports = JsonPathCity
