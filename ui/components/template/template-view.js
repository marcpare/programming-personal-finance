var AmpersandView = require('ampersand-view');

var View = AmpersandView.extend({
  template: require('./.jade'),
  
  initialize: function (options) {
    options = options || {};
  },
    
  render: function () {
    this.renderWithTemplate();
    return this;
  }
  
});
module.exports = View;