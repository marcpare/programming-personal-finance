var _ = require('underscore');
var moment = require('moment');

function TransactionCollection (data) {
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

TransactionCollection.prototype.sort = function (key, order, options) {
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

module.exports = TransactionCollection;