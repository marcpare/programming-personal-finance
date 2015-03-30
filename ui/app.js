
// Add template helpers
var AmpersandView = require('ampersand-view');
AmpersandView.prototype.h = require('./helpers');

var AppView = require('./components/app/app-view');
var appView = new AppView();
appView.render();
appView.show('pivot');