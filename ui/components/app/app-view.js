var moment = require('moment');
var AmpersandView = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var Collection = require('ampersand-collection');
var TransactionTableView = require('../transaction-table/transaction-table-view');
var PlotView = require('../expenses-plot/expenses-plot-view');
var PivotView = require('../expenses-pivot/expenses-pivot-view');
var logError = require('../../log-error');

var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  events: {
    'click [data-hook=header-action]': 'show'
  },
  
  initialize: function () {
    
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);

    App.services.Expenses.fetch()
      .then(function (expenses) {
        this.expenses = expenses;
        this.render();
      }.bind(this))
      .catch(logError);
  },
  
  show: function (e) {
    var show = $(e.target).data('show');
    var View = {
      plots: PlotView,
      pivot: PivotView
    }[show];
    this.pageSwitcher.set(new View());
  },
    
  render: function () {
        
    this.renderWithTemplate();
    
    this.pageContainer = this.queryByHook('page-container');
    this.pageSwitcher = new ViewSwitcher(this.pageContainer, {
      show: function (view) {}
    });
    
        //
    // if (this.expenses) {
    //
    //   this.renderSubview(new TransactionTableView({
    //     collection: this.expenses.pipe().after('01/01/2015').collection()
    //   }), '[data-hook=transactions-table]');
    //
    //   var d = this.expenses
    //     .pipe()
    //     .after('01/01/2015')
    //     .filter(function (d) { return !d.hidden; })
    //     .sort('Date', 'asc', {unix: true})
    //     .cumsum()
    //     .flot();
    //
    //   var plotView = new PlotView({
    //     data: d,
    //     plotOptions: {
    //       xaxis: {
    //         mode: "time",
    //         timeformat: "%b %d %Y"
    //       }
    //     }
    //   });
    //
    //   this.renderSubview(plotView, '[data-hook=expenses-plot]');
    //   plotView.plot();
    //
    //   d = this.expenses
    //     .pipe()
    //     .after('01/01/2015')
    //     .filter(function (d) { return !d.hidden; })
    //     .sort('Date', 'asc', {unix: true})
    //     .binMonths()
    //     .flot();
    //
    //   plotView = new PlotView({
    //     data: d,
    //     plotOptions: {
    //       bars: { show: true, barWidth: 0.5, fill: 0.9 },
    //       xaxis: {
    //         mode: "time",
    //         timeformat: "%b %d %Y"
    //       }
    //     }
    //   });
    //   this.renderSubview(plotView, '[data-hook=monthly-expenses-plot]');
    //   plotView.plot();
    //
    // }
  }
});
module.exports = AppView;