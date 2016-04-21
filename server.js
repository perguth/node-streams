var http = require('http')
var crypto = require('./crypto')

var server = http.createServer(function (req, res) {
  // process.stdout.write(req.url.substr(1))
  process.stdout.write(crypto.decrypt(req.url.substr(1)))

  res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
  res.end()
})

server.listen(9090)
