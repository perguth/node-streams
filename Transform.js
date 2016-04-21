var Transform = require('stream').Transform

// -- Long version --
var inherits = require('inherits')

inherits(MyTransform, Transform)

function MyTransform () {
  Transform.call(this)

  this._transform = function (buffer, encoding, next) {
    // do something with buffer
    this.push(buffer)
    next()
  }
}

var transformStream = new MyTransform()

// -- Short version --
var transformStream2 = new Transform({
  transform: (buffer, encoding, next) => {
    // do something with buffer
    this.push(buffer)
    next()
  }
})

// -- Methods --

// ._transform(chunk, encoding, callback)
// ._flush(callback)

// -- Events --

// finish
// end
