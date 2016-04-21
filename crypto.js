var crypto = require('crypto')
var algorithm = 'aes192'

module.exports = {
  encrypt,
  decrypt
}

function decrypt (ciphertext) {
  var decipher = crypto.createDecipher(algorithm, 'pw')
  var plaintext = decipher.update(ciphertext, 'hex', 'utf8')
  plaintext += decipher.final('utf8')
  return plaintext
}

function encrypt (plaintext) {
  var encipher = crypto.createCipher(algorithm, 'pw')
  var ciphertext = encipher.update(plaintext, 'utf8', 'hex')
  ciphertext += encipher.final('hex')
  return ciphertext
}
