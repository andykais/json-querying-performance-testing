const { JSONPath } = require('jsonpath-plus')
const CityLotsORM = require('./base-class')

class JsonPathPlusCity extends CityLotsORM {
  execute(query) {
    return JSONPath({
      path: query,
      json: this.data
    })
  }
  shallow() {
    return this.execute('$.features..properties')
  }
  deep() {
    return this.execute('$.features..properties.BLOCK_NUM')
  }
  conditional() {
    return this.execute(
      `$.features[?(@.properties.STREET == 'UNKNOWN')].properties.BLOCK_NUM`
    )
  }
}

module.exports = JsonPathPlusCity
