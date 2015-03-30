var AmpersandView = require('ampersand-view');

var ExpensesPivotView = AmpersandView.extend({
  template: require('./expenses-pivot.jade'),
  
  initialize: function (options) {
    options = options || {};
  },
    
  render: function () {
    this.renderWithTemplate();
    return this;
  }
  
});
module.exports = ExpensesPivotView;