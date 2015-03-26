var moment = require('moment');
var AmpersandView = require('ampersand-view');
var Collection = require('ampersand-collection');
var TransactionTableView = require('../transaction-table/transaction-table-view');
var Expenses = require('../../services/transactions');

var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  initialize: function () {
    
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);
        
    Expenses.fetch().then(function (expenses) {
      this.expenses = new Backbone.Collection(expenses);
      this.render();
    }.bind(this));
  },
  
  render: function () {
    
    // calculateExpenses
    
    // var expenses = this.transactions.map(function (t) {
    //   return [moment(t.Date), parseFloat(t.Amount), t['Transaction Type']];
    // });
    //
    // expenses = expenses.filter(function (e) {
    //   return e[2] === 'debit';
    // });
    //
    // expenses = expenses.map(function (e) {
    //   return [e[0], e[1]];
    // });
    //
    // expenses.sort(function (a, b) {
    //   return a[0].unix()-b[0].unix();
    // });
    //
    // var cumsum = 0;
    // expenses = expenses.map(function (e) {
    //   cumsum += e[1];
    //   return [e[0], cumsum];
    // });
    //
    // this.expenses = expenses;
    // this.expenseHeaders = [
    //   'Date',
    //   'Amount'
    // ];
    
    this.renderWithTemplate();    
    
    if (this.expenses) {
      
      console.log('got expenses');
      console.log(this.expenses);
      
      this.renderSubview(new TransactionTableView({
        collection: this.expenses
      }, '[data-hook=transactions-table]'));
            
      // var d = expenses;
      // console.log(d);
      //
      // $.plot("#chart", [d], {
      //   xaxis: { mode: "time" }
      // });
      
    }     
  }
});
module.exports = AppView;