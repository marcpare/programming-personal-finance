var pepperMint = require('pepper-mint');
module.exports = {
  fetch: function () {
    var username = nodeprocess.env['MINT_USERNAME'];
    var password = nodeprocess.env['MINT_PASSWORD']; 
    return pepperMint(username, password)
      .then(function (mint) {
        return mint.downloadTransactions();
      });
  }
}