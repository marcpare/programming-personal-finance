var AmpersandView = require('ampersand-view');
var logError = require('../../log-error');

var PivotPageView = AmpersandView.extend({
  template: require('./pivot-page.jade'),
  
  initialize: function (options) {
    options = options || {};
    this.pivot = false;
    
    App.services.Expenses.fetch()
      .then(function (expenses) {
        this.expenses = expenses;
        
        this.pivot = this.expenses
          .pipe()
          .after('01/01/2015')
          .filter(function (d) { return !d.hidden; })
          .pivot();
        
        console.log(this.pivot);
          
        this.render();
      }.bind(this))
      .catch(logError);
  },
    
  render: function () {
    this.renderWithTemplate();
    return this;
  }
  
});
module.exports = PivotPageView;