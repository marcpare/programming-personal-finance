// 
// 
// Expenses are a filtered and annotated list of Transactions
// 
// 
var _ = require('underscore');
var moment = require('moment');
var pepperMint = require('pepper-mint');
var Collection = require('ampersand-collection');
var Transactions = require('./transactions');

function Expenses (data) {
  this.data = data;
    
  this.data.forEach(function (d) {
    // wrap dates in `moment`
    d.Date = moment(d.Date);
    
    // convert Amount to cents
    if (!d._Amount) {
      d._Amount = d.Amount;
      d.Amount = Math.floor(parseFloat(d._Amount)*100);
    }
  });
  
}

Expenses.prototype.pipe = function () {
  return new ExpensesPipe(this.data.slice(0));
};

function ExpensesPipe (data) {
  this.applyCumsum = false;
  this.applyBinMonths = false;
  this.data = data;
}

ExpensesPipe.prototype.collection = function () {
  return new Collection(this.data);
};

ExpensesPipe.prototype.filter = function (f) {
  this.data = this.data.filter(f);
  return this;
};

ExpensesPipe.prototype.after = function (dateString) {
  var afterThisDate = moment(dateString);
  this.data = this.data.filter(function (d) {
    return d.Date >= afterThisDate;
  });
  return this;
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

ExpensesPipe.prototype.binMonths = function () {
  this.applyBinMonths = true;
  return this;
};

ExpensesPipe.prototype.pivot = function () {
  // collect all categories
  var categories = _.pluck(this.data, 'Category');
  categories = _.uniq(categories);
  categories.sort();
  
  // collect months
  var dates = _.pluck(this.data, 'Date');
  var months = _.map(dates, function (d) { 
    return d.month();
  });
  months = _.uniq(months);
  months.sort();
  
  var data = this.data;
  data = _.groupBy(data, function (d) { return d.Date.month(); });
  data = _.mapObject(data, function (transactions, month) {
    transactions = _.groupBy(transactions, 'Category');
    return _.mapObject(transactions, function (ts) {
      return {
        transactions: ts,
        sum: _.sum(_.pluck(ts, 'Amount'))
      };
    });
  });
  
  return {
    categories: categories,
    months: months,
    data: data
  };
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
  
  if (this.applyBinMonths) {
    data = _.groupBy(data, function (d) { return d[0].month(); });
    data = _.pairs(data);
    data = data.map(function (bin) {
      return _.reduce(bin[1], function (memo, d) {
        return [memo[0], memo[1] + d[1]];
      }, [bin[0][0], 0.0]);
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
          'Investment': true,
          'Federal Tax': true
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