
// Add template helpers
var AmpersandView = require('ampersand-view');
var moment = require('moment');
AmpersandView.prototype.h = {
  month: function (number) {
    return moment().month(number).format('MMMM');
  }
}


var AppView = require('./components/app/app-view');
var appView = new AppView();
appView.render();
appView.show('pivot');