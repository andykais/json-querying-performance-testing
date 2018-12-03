const jsonQuery = require('json-query')
const CityLotsORM = require('./base-class')

class JsonQueryCity extends CityLotsORM {
  execute(query) {
    return jsonQuery(query, { data: this.data }).value
  }
  shallow() {
    return this.execute('features.properties')
  }
  deep() {
    return this.execute('features.properties.BLOCK_NUM')
  }
  conditional() {
    return this.execute('features.properties[*STREET=UNKNOWN].BLOCK_NUM')
  }
}

module.exports = JsonQueryCity
