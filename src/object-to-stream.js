const stream = require('stream')
const util = require('util')
const split2 = require('split2')

module.exports = (object, { chunks = false } = {}) => {
  const rs = new stream.Readable()
  if (chunks) {
    rs.push(JSON.stringify(object, null, 2))
    rs.push(null)
    return rs.pipe(split2())
  } else {
    rs.push(JSON.stringify(object))
    rs.push(null)
    return rs
  }
}
