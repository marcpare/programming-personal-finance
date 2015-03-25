var csv = require('csv-parse');
var username = process.env['MINT_USERNAME'];
var password = process.env['MINT_PASSWORD'];
var mint;

require('pepper-mint')(username, password)
.then(function (m) {
  mint = m;
  return mint.downloadTransactions();
})
.then(function (transactions) {
  console.log(transactions);
})
.catch(function (err) {
  console.log(err);
});


var AppView = require('./components/app/app-view');
var appView = new AppView();
appView.render();
document.querySelector('#app').appendChild(appView.el);


// Display the transaction table

// 