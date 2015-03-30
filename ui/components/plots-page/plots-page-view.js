var AmpersandView = require('ampersand-view');
var TransactionTableView = require('../transaction-table/transaction-table-view');
var PlotView = require('../expenses-plot/expenses-plot-view');
var logError = require('../../log-error');

var PlotsView = AmpersandView.extend({
  template: require('./plots-page.jade'),
  
  initialize: function (options) {
    options = options || {};
    
    App.services.Expenses.fetch()
      .then(function (expenses) {
        this.expenses = expenses;
        this.render();
      }.bind(this))
      .catch(logError);
  },
    
  render: function () {
    this.renderWithTemplate();
    
    if (this.expenses) {
      
      this.renderSubview(new TransactionTableView({
        collection: this.expenses.pipe().after('01/01/2015').collection()
      }), '[data-hook=transactions-table]');
      
      var d = this.expenses
        .pipe()
        .after('01/01/2015')
        .filter(function (d) { return !d.hidden; })
        .sort('Date', 'asc', {unix: true})
        .cumsum()
        .flot();
  
      var plotView = new PlotView({
        data: d,
        plotOptions: {
          xaxis: { 
            mode: "time",
            timeformat: "%b %d %Y"
          }
        }
      });
        
      this.renderSubview(plotView, '[data-hook=expenses-plot]');
      plotView.plot();
  
      d = this.expenses
        .pipe()
        .after('01/01/2015')
        .filter(function (d) { return !d.hidden; })
        .sort('Date', 'asc', {unix: true})
        .binMonths()
        .flot();

      plotView = new PlotView({
        data: d,
        plotOptions: {
          bars: { show: true, barWidth: 0.5, fill: 0.9 },
          xaxis: { 
            mode: "time",
            timeformat: "%b %d %Y"
          }
        }
      });
      this.renderSubview(plotView, '[data-hook=monthly-expenses-plot]');
      plotView.plot();
  
    }     
    
    return this;
  }
  
});
module.exports = PlotsView;