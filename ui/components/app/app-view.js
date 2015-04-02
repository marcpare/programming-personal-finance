var moment = require('moment');
var AmpersandView = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var Collection = require('ampersand-collection');
var PlotsPage = require('../plots-page/plots-page-view');
var PivotPage = require('../pivot-page/pivot-page-view');

var SaveFragmentView = AmpersandView.extend({
  template: '<input id="save-as" type="file" nwsaveas="transactions.json">',
  events: {
    'change #save-as': 'receiveFile'
  },
  receiveFile: function () {
    var path = this.query('#save-as').value;
  },
  prompt: function () {
    this.query('#save-as').click();
  }
});

var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  events: {
    'click [data-hook=header-action]': 'linkShow',
    'click [data-hook=update]': 'update'
  },
  
  initialize: function () {
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);
  },
  
  linkShow: function (e) {
    this.show($(e.target).data('show'));
  },
  
  update: function () {
    
    var saveFragment = new SaveFragmentView();
    console.log('prompting');
    saveFragment.render();
    saveFragment.prompt();
    
    // var saver = new App.services.Saver(this.queryByHook('[save-as-input]'));
    // saver.save({hello:"world"});
  },
  
  show: function (show) {
    var View = {
      plots: PlotsPage,
      pivot: PivotPage
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