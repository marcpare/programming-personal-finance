var moment = require('moment');
var AmpersandView = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var Collection = require('ampersand-collection');
var PlotsPage = require('../plots-page/plots-page-view');
var PivotView = require('../expenses-pivot/expenses-pivot-view');

var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  events: {
    'click [data-hook=header-action]': 'linkShow'
  },
  
  initialize: function () {
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);
  },
  
  linkShow: function (e) {
    this.show($(e.target).data('show'));
  },
  
  show: function (show) {
    var View = {
      plots: PlotsPage,
      pivot: PivotView
    }[show];
    this.pageSwitcher.set(new View());
  },
    
  render: function () {
    this.renderWithTemplate();
    this.pageContainer = this.queryByHook('page-container');
    this.pageSwitcher = new ViewSwitcher(this.pageContainer);
    return this;
  }
});
module.exports = AppView;