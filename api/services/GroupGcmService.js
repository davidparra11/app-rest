
var gcm = require('node-gcm')

module.exports = gcm.Sender('AIzaSyCTj1R9ALophNp_4XMkHAJABxUER1Z3Bzc').sendNoRetry('hola', { registrationTokens: [] }, function(err, response) {
  if(err) console.error(err);
  else    console.log(response);
});