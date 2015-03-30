var AmpersandView = require('ampersand-view');

var TransactionPaneView = AmpersandView.extend({
  template: require('./transaction-pane.jade'),
  
  initialize: function (options) {
    options = options || {};
  },
    
  render: function () {
    this.renderWithTemplate();
    return this;
  }
  
});
module.exports = TransactionPaneView;