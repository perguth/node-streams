var Readable = require('stream').Readable

// -- Long version --
var inherits = require('inherits')

inherits(MyReadable, Readable)

function MyReadable () {
  Readable.call(this)

  this._read = function () {
    var data = 'payload'
    this.push(data)
    this.push(null)
  }
}
var readStream = new MyReadable()

// -- Short version --
var readStream2 = new Readable({
  read: function () {
    var data = 'payload'
    this.push(data)
    this.push(null)
  }
})

// -- Methods --

// .read([size])
// .setEncoding(encoding)
// .pause()
// .isPaused()
// .resume()
// .readable.unshift(chunk)
// .pipe(destination[, options])
// .unpipe([destination])

// -- Events --

readStream.on('data', (buff) => {
  console.log(buff.toString())
})

// data
// end
// close
// error
// readable
