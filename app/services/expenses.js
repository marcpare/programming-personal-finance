// 
// 
// Expenses are a filtered and annotated list of Transactions
// 
// 
var moment = require('moment');
var pepperMint = require('pepper-mint');
var Collection = require('ampersand-collection');
var Transactions = require('./transactions');


function Expenses (data) {
  this.data = data;
  
  // wrap dates in `moment`
  this.data.forEach(function (d) {
    d.Date = moment(d.Date);
  });
  
}

Expenses.prototype.pipe = function () {
  return new ExpensesPipe(this.data.slice(0));
};

function ExpensesPipe (data) {
  this.applyCumsum = false;
  this.data = data;
}

ExpensesPipe.prototype.collection = function () {
  return new Collection(this.data);
};

ExpensesPipe.prototype.sort = function (key, order, options) {
  options = options || {};
  order = order === 'asc' ? 1 : -1;
  this.data.sort(function (a, b) {
    var a = a[key];
    var b = b[key];
    if (options.unix) { a = a.unix(); b = b.unix(); }
    return (a-b)*order;
  });
  return this;
};

ExpensesPipe.prototype.cumsum = function () {
  this.applyCumsum = true;
  return this;
};

ExpensesPipe.prototype.flot = function () {
  var data = this.data.map(function (t) {
    return [t.Date, parseFloat(t.Amount)];
  });
  
  if (this.applyCumsum) {
    var cumsum = 0;
    data = data.map(function (e) {
      cumsum += e[1];
      return [e[0], cumsum];
    });
  }
  this.data = data;
  return this.data;
};

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
      
        return new Expenses(e);
      
      }.bind(this))
      .catch(function (err) {
        console.log('Fetch error');
        console.log(err);
        console.log(err.stack);
      });
  }
}