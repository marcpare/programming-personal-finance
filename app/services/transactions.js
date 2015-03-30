var Q = require('q');
var pepperMint = require('pepper-mint');

module.exports = {
  
  mock: function () {
    console.log('Loading mock transactions');
    return Q.fcall(function () {
      return require('./mock-transactions');
    });
  },
  
  fetch: function () {
    var username = process.env['MINT_USERNAME'];
    var password = process.env['MINT_PASSWORD']; 
    var useMock = process.env['USE_MOCK_TRANSACTIONS'];
    
    if (useMock) return this.mock();
    
    return pepperMint(username, password)
      .then(function (mint) {
        return mint.downloadTransactions();
      });
  }
}