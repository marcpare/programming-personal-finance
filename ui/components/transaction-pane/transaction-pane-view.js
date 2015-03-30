var AmpersandView = require('ampersand-view');

var TransactionPaneView = AmpersandView.extend({
  template: require('./transaction-pane.jade'),
  
  initialize: function (options) {
    options = options || {};
    this.transactions = options.transactions;
    
    console.log(this.transactions);
    // sort by date
    // list of headers
    
    this.transactions = new App.collections.Transaction(this.transactions);
    this.transactions.sort('date');
    
    this.headers = [
      'Date',
      'Description',
      'Original Description',
      'Amount',
      'Account Name'
    ];
  },
    
  render: function () {
    this.renderWithTemplate();
    return this;
  }
  
});
module.exports = TransactionPaneView;