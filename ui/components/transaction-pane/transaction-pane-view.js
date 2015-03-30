var AmpersandView = require('ampersand-view');

var TransactionPaneView = AmpersandView.extend({
  template: require('./transaction-pane.jade'),
  
  initialize: function (options) {
    options = options || {};
    this.transactions = options.transactions;
    this.transactions = new App.collections.Transaction(this.transactions);
    this.transactions.sort('Date', 'asc');
  },
    
  render: function () {
    this.renderWithTemplate();
    return this;
  }
  
});
module.exports = TransactionPaneView;