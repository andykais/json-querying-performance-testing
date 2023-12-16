const { UnImplementedError } = require('../errors');

class CityLotsORM {
  constructor(data) {
    this.data = data;
  }
  setup() {}
  cleanup() {}

  shallow() {
    throw new UnImplementedError();
  }
  deep() {
    throw new UnImplementedError();
  }
  conditional() {
    throw new UnImplementedError();
  }
}
module.exports = CityLotsORM;
