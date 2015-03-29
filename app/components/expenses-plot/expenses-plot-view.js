var AmpersandView = require('ampersand-view');

var ExpensesPlotView = AmpersandView.extend({
  template: require('./expenses-plot.jade'),
  
  // data: pairs of points to plot [[x, y], [x, y], ...]
  initialize: function (options) {
    options = options || {};
    this.data = options.data || [];
  },
  
  render: function () {
    this.renderWithTemplate();
    
    var elPlot = this.queryByHook('plot');
    var $elPlot = $(elPlot);
    
    console.log('here is my data');
    console.log(this.data);
    
    $(elPlot).plot([this.data], {
      xaxis: { 
        mode: "time",
        timeformat: "%b %Y"
      }
    });
    
    return this;
  }
  
});
module.exports = ExpensesPlotView;