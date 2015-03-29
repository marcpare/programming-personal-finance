var AmpersandView = require('ampersand-view');

var ExpensesPlotView = AmpersandView.extend({
  template: require('./expenses-plot.jade'),
  
  // collection: collection of transactions
  initialize: function () {
    
  },
  
  render: function () {
    this.renderWithTemplate();
    
    var elPlot = this.queryByHook('plot');
    var $elPlot = $(elPlot);
    
    $(elPlot).plot([[1,2], [3, 4]], {
      xaxis: { mode: "time" }
    });
    
    return this;
  }
  
});
module.exports = ExpensesPlotView;