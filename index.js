// budo index.js --live --host localhost

function firstExamples () {
  var Reader = require('filestream').read

  var uploadBtn = document.createElement('input')
  uploadBtn.setAttribute('type', 'file')
  uploadBtn.setAttribute('onchange', 'window.sendFile(event)')
  var a = document.body.appendChild(uploadBtn)

  window.sendFile = (event) => {
    var readStream = new Reader(event.target.files[0])

    function missOutOnChunks () {
      readStream.on('end', () => console.log('You missed out, bro!'))

      readStream.resume()
      setTimeout(() => {
        readStream.on('end', () => console.log('end'))
        readStream.on('data', (buff) => console.log(buff))
      }, 300)
    }
    // missOutOnChunks()

    function readWithoutReadable () {
      console.log(readStream.read())
      setTimeout(() => console.log(readStream.read()), 300)
    }
    // readWithoutReadable()

    function fastestMethod () {
      readStream.on('data', (chunk) => console.log(chunk))
    }
    // fastestMethod()

    function explicitlyPaused () {
      readStream.pause()
      readStream.on('data', (chunk) => console.log(chunk))
    }
    // explicitlyPaused()

    function readOnReadable () {
      readStream.on('end', () => console.log('end'))
      readStream.on('readable', () => console.log('readable!', readStream.read()))
    }
    // readOnReadable()

    function dataEventOnRead () {
      readStream.pause()
      readStream.on('data', (chunk) => console.log('data event', chunk))

      var once = false
      readStream.on('readable', () => {
        if (once--) return
        console.log('.read()', readStream.read())
      })
    }
    // dataEventOnRead()
  }
}
// firstExamples()

function basicReadWriteStreams () {
  var inherits = require('inherits')
  var Writable = require('stream').Writable
  var Readable = require('stream').Readable
  var PassThrough = require('stream').PassThrough

  inherits(MyReadable, Readable)
  function MyReadable (opts) {
    Readable.call(this, opts)

    this._read = (size) => {
      this.push('Hello')
      this.push('Hanqing!')
      this.push(null)
    }
  }

  inherits(MyWritable, Writable)
  function MyWritable (opts) {
    Writable.call(this, opts)

    this._write = (chunk, _, next) => {
      console.log(
        chunk// .toString()
      )
      next()
    }
  }

  inherits(MyPassThrough, PassThrough)
  function MyPassThrough (opts) {
    PassThrough.call(this, opts)

    this.on('data', (buff) => console.log('peek:',
      buff// .toString()
    ))
  }

  var rs = new MyReadable(
    // {encoding: 'utf8'}
  )
  var ws = new MyWritable(
    // {decodeStrings: false}
  )
  var ps = new MyPassThrough(
    {encoding: 'utf8'}
  )

  rs
    .pipe(ps)
    .pipe(ws)
}
// basicReadWriteStreams()

function simpleReadWriteStreams () {
  var Writable = require('stream').Writable
  var Readable = require('stream').Readable
  var PassThrough = require('stream').PassThrough

  var rs = new Readable({
    read: function (size) {
      this.push('Hello')
      this.push('Hanqing!')
      this.push(null)
    }
  })
  var ws = new Writable({
    write: (buff, _, next) => {
      console.log(
        buff// .toString()
      )
      next()
    }
    // decodeStrings: false
  })
  var ps = new PassThrough({
    encoding: 'utf8'
  })
  ps.on('data', (buff) => {
    console.log('peek:',
      buff// .toString()
    )
  })

  rs
    .pipe(ps)
    .pipe(ws)
}
// simpleReadWriteStreams()

function referat () {
  // -- Readable --
  var Readable = require('stream').Readable

  var rs = new Readable({
    read: function (size) {
      this.push('test')
      this.push(null)
    }
  })

  // -- Writable --
  var Writable = require('stream').Writable
  var request = require('request')

  var ws = new Writable({
    write: (buffer, _, next) => {
      request('http://localhost:9090/' + buffer.toString())
      next()
    }
  })

  // rs.pipe(ws)

  // -- HTML --
  var button = document.createElement('input')
  button.setAttribute('type', 'file')
  button.setAttribute('onchange', 'window.sendFile(event)')
  document.body.appendChild(button)

  // -- Readable: File Stream --
  var Reader = require('filestream').read

  window.sendFile = (event) => {
    var fs = new Reader(event.target.files[0], {chunkSize: 10})

    fs.pipe(ps).pipe(ts).pipe(ws)
  }

  // -- Transform: Crypto --
  var Transform = require('stream').Transform
  let crypto = require('./crypto')

  var ts = new Transform({
    transform: function (buffer, _, next) {
      var ciphertext = crypto.encrypt(buffer.toString())
      this.push(ciphertext)
      setTimeout(next, 300)
    },
    highWaterMark: 10
  })

  // -- Passthrough --
  var PassThrough = require('stream').PassThrough

  var ps = new PassThrough()
  ps.on('data', (buff) => console.log('peek:', buff.toString()))
}
referat()
