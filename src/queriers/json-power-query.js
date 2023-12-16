const { queryBuilder } = require('json-power-query');
const CityLotsORM = require('./base-class');

class JsonPowerQueryCity extends CityLotsORM {
  execute(query) {
    const f = queryBuilder(query);
    return f(this.data);
  }
  shallow() {
    return this.execute('$.features.*.properties');
  }
  deep() {
    return this.execute('$.features.*.properties.BLOCK_NUM');
  }
  conditional() {
    return this.execute(`$.features.[?(@.properties.STREET === 'UNKNOWN')].properties.BLOCK_NUM`);
  }
}

module.exports = JsonPowerQueryCity;
