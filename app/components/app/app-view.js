var AmpersandView = require('ampersand-view');
var AppView = AmpersandView.extend({
  template: require('./app.jade')
});
module.exports = AppView;