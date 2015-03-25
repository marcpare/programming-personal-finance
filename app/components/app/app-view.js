var AmpersandView = require('ampersand-view');
var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  initialize: function () {
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);
  },
  
  render: function () {
    this.renderWithTemplate();    
    $('[data-hook=transactions]').DataTable();
  }
});
module.exports = AppView;