var AmpersandView = require('ampersand-view');
var TransactionPane = require('../transaction-pane/transaction-pane-view');
var logError = require('../../log-error');

var PivotPageView = AmpersandView.extend({
  template: require('./pivot-page.jade'),
  
  events: {
    'click [data-hook=pivot-cell]': 'loadTransactions'
  },
  
  initialize: function (options) {
    options = options || {};
    this.pivot = false;
    this.transactionPane = false;
    
    App.services.Expenses.fetch()
      .then(function (expenses) {
        this.expenses = expenses;
        
        this.pivot = this.expenses
          .pipe()
          .after('01/01/2015')
          .pivot();
          
        this.render();
      }.bind(this))
      .catch(logError);
  },
  
  loadTransactions: function (e) {
    var cell = $(e.target);
    var month = cell.data('month');
    var category = cell.data('category');    
    var transactions = (((this.pivot.data[month]||{})[category]||{}).transactions||[]);
    
    if (this.transactionPane) this.transactionPane.remove();    
    this.transactionPane = new TransactionPane({
      transactions: transactions
    });
    this.renderSubview(this.transactionPane, '[data-hook=transactions]');
  },
    
  render: function () {
    this.renderWithTemplate();
    return this;
  }
  
});
module.exports = PivotPageView;