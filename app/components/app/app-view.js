var moment = require('moment');
var AmpersandView = require('ampersand-view');
var Collection = require('ampersand-collection');
var TransactionTableView = require('../transaction-table/transaction-table-view');
var PlotView = require('../expenses-plot/expenses-plot-view');
var Expenses = require('../../services/expenses');
var logError = require('../../log-error');

var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  initialize: function () {
    
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);

    Expenses.fetch()
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
        data: d
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
        data: d
      });
      this.renderSubview(plotView, '[data-hook=monthly-expenses-plot]');
      plotView.plot();
      
    }     
  }
});
module.exports = AppView;