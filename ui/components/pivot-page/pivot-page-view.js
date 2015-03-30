var AmpersandView = require('ampersand-view');
var logError = require('../../log-error');

var PivotPageView = AmpersandView.extend({
  template: require('./pivot-page.jade'),
  
  events: {
    'click [data-hook=pivot-cell]': 'loadTransactions'
  },
  
  initialize: function (options) {
    options = options || {};
    this.pivot = false;
    
    App.services.Expenses.fetch()
      .then(function (expenses) {
        this.expenses = expenses;
        
        this.pivot = this.expenses
          .pipe()
          .after('01/01/2015')
          .pivot();
        
        console.log(this.pivot);
          
        this.render();
      }.bind(this))
      .catch(logError);
  },
  
  loadTransactions: function (e) {
    var cell = $(e.target);
    var month = cell.data('month');
    var category = cell.data('category');
    
    console.log(month);
    console.log(category);
  },
    
  render: function () {
    this.renderWithTemplate();
    return this;
  }
  
});
module.exports = PivotPageView;