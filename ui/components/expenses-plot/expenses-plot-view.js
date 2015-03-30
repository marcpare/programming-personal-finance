var AmpersandView = require('ampersand-view');

var ExpensesPlotView = AmpersandView.extend({
  template: require('./expenses-plot.jade'),
  
  // data: pairs of points to plot [[x, y], [x, y], ...]
  initialize: function (options) {
    options = options || {};
    this.plotOptions = options.plotOptions || {};
    this.data = options.data || [];
  },
  
  plot: function () {
    this.$elPlot.plot([this.data], this.plotOptions);
  },
  
  render: function () {
    this.renderWithTemplate();
    var elPlot = this.queryByHook('plot');
    var $elPlot = $(elPlot);
    this.$elPlot = $elPlot;    
    return this;
  }
  
});
module.exports = ExpensesPlotView;