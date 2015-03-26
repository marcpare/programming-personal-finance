// 
// 
// Expenses are a filtered and annotated list of Transactions
// 
// 
var pepperMint = require('pepper-mint');
var Transactions = require('./transactions');

module.exports = {
  fetch: function () {    
    return Transactions.fetch()
      .then(function (transactions) {
      
        var e = transactions.filter(function (t) {
          return t['Transaction Type'] === 'debit';
        });
        
        var hiddenCategories = {
          'Credit Card Payment': true,
          'Investment': true
        }
        
        transactions.forEach(function (t) {
          t.hidden = !!hiddenCategories[t.Category]
        });
      
        return e;
      
      }.bind(this))
      .catch(function (err) {
        console.log('Fetch error');
        console.log(err);
        console.log(err.stack);
      });
  }
}