var AmpersandView = require('ampersand-view');
var AmpersandCollection = require('ampersand-collection');
var Transactions = require('../../services/transactions');

var AppView = AmpersandView.extend({
  template: require('./app.jade'),
  
  initialize: function () {
    this.transactions = [];
    this.headers = [];
    
    // attach to DOM right away
    this.renderWithTemplate();
    document.querySelector('#app').appendChild(this.el);
    
    Transactions.fetch().then(function (transactions) {
      if (transactions.length > 0) {
        this.headers = Object.keys(transactions[0]);
        this.transactions = transactions;        
        this.render();
      }
    }.bind(this))
    .catch(function (err) {
      console.log('Fetch error');
      console.log(err);
      console.log(err.stack);
    });
  },
  
  render: function () {
    this.renderWithTemplate();    
    
    if (this.transactions.length > 0) $('[data-hook=transactions]').DataTable();
  }
});
module.exports = AppView;