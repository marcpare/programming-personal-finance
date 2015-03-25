var moment = require('moment');
var AmpersandView = require('ampersand-view');
var AmpersandCollection = require('ampersand-collection');
var Transactions = require('../../services/transactions');

var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  initialize: function () {
    this.transactions = [];
    this.expenses = [];
    this.expenseHeaders = [];
    this.headers = [];
    
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);
    
    Transactions.fetch().then(function (transactions) {
      if (transactions.length > 0) {
        this.headers = Object.keys(transactions[0]);
        this.transactions = transactions;        
        this.render();
      }
    }.bind(this))
    .catch(function (err) {
      console.log('Fetch error');
      console.log(err);
      console.log(err.stack);
    });
  },
  
  render: function () {
    
    // calculateExpenses
    
    var expenses = this.transactions.map(function (t) {
      return [moment(t.Date), parseFloat(t.Amount), t['Transaction Type']];
    });
    
    expenses = expenses.filter(function (e) {
      return e[2] === 'debit';
    });
    
    expenses = expenses.map(function (e) {
      return [e[0], e[1]];
    });
    
    expenses.sort(function (a, b) {
      return a[0].unix()-b[0].unix();
    });
    
    var cumsum = 0;
    expenses = expenses.map(function (e) {
      cumsum += e[1];
      return [e[0], cumsum];
    });
    
    this.expenses = expenses;
    this.expenseHeaders = [
      'Date',
      'Amount'
    ];
    
    
    
    this.renderWithTemplate();    
    
    if (this.transactions.length > 0) {
      
      $('[data-hook=expenses]').DataTable({
        lengthMenu: [[-1], ['All']]
      });
      
      $('[data-hook=transactions]').DataTable({
        lengthMenu: [[-1], ['All']]
      });
      
      var d = expenses;
      console.log(d);

      $.plot("#placeholder", [d], {
        xaxis: { mode: "time" }
      });
      
    }     
  }
});
module.exports = AppView;