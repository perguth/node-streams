var Writable = require('stream').Writable

// -- Long version --
var inherits = require('inherits')

inherits(MyWritable, Writable)

function MyWritable () {
  Writable.call(this)

  this._write = (buffer, encoding, next) => {
    console.log(buffer)
    next()
  }
}
var writeStream = new MyWritable()

// -- Short version --
var writeStream2 = new Writable({
  write: (buffer, encoding, next) => {
    console.log(buffer)
    next()
  }
})

// -- Methods --

var data = 'payload'
writeStream.write(data)

// .write(chunk[, encoding][, callback]) -> <Boolean>
// .setDefaultEncoding(encoding)
// .end([chunk][, encoding][, callback])
// .cork()
// .uncork()

// -- Events --

writeStream.on('drain', () => {
  writeStream.write(data)
})

// drain
// finish
// error
// finish
// pipe
// unpipe
