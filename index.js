var csv = require('csv-parse');

var mint;

var username = process.env['MINT_USERNAME'];
var password = process.env['MINT_PASSWORD'];

require('pepper-mint')(username, password)
.then(function (m) {
  mint = m;
  console.log('logged in');
  return mint.downloadTransactions();
})
.then(function (t) {
  console.log(t[0])
})
.catch(function (err) {
  console.log(err);
});



