var AmpersandView = require('ampersand-view');

var ExpensesPlotView = AmpersandView.extend({
  template: require('./expenses-plot.jade'),
  
  // collection: collection of transactions
  initialize: function () {
    
  },
  
  render: function () {
    console.log('Expenses rendering');
    this.renderWithTemplate();
    
    console.log(this.el);
    
    return this;
  }
  
});
module.exports = ExpensesPlotView;