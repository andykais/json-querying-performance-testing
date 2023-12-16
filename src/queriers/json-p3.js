const jsonpath = require('json-p3');
const CityLotsORM = require('./base-class');

class JsonP3City extends CityLotsORM {
  execute(query) {
    return jsonpath.query(query, this.data);
  }
  shallow() {
    return this.execute('$.features..properties');
  }
  deep() {
    return this.execute('$.features..properties.BLOCK_NUM');
  }
  conditional() {
    return this.execute(`$.features[?(@.properties.STREET=='UNKNOWN')].properties.BLOCK_NUM`);
  }
}

module.exports = JsonP3City;
