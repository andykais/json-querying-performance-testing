const stream = require('stream')
const util = require('util')

function StringifyStream() {
  stream.Transform.call(this)

  this._readableState.objectMode = false
  this._writableState.objectMode = true
}
util.inherits(StringifyStream, stream.Transform)

StringifyStream.prototype._transform = function(obj, encoding, cb) {
  this.push(JSON.stringify(obj))
  cb()
}

module.exports = object => {
  var rs = new stream.Readable({ objectMode: true })
  rs.push(object)
  rs.push(null)
  return rs.pipe(new StringifyStream())
}
