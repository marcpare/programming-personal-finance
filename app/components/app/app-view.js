var AmpersandView = require('ampersand-view');
var AmpersandCollection = require('ampersand-collection');
var Transactions = require('../../services/transactions');

var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  initialize: function () {
    this.collection = new AmpersandCollection([]);
    
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);
    
    Transactions.fetch().then(function (transactions) {
      this.collection.reset(transactions);
      console.log('reset');
    }.bind(this))
    .catch(function (err) {
      console.log('Fetch error');
      console.log(err);
      console.log(err.stack);
    });
    
    this.listenTo(this.collection, 'reset', this.render);
  },
  
  render: function () {
    this.renderWithTemplate();    
    $('[data-hook=transactions]').DataTable();
  }
});
module.exports = AppView;