var moment = require('moment');
var _ = require('underscore');
var AmpersandView = require('ampersand-view');

var TransactionTableView = AmpersandView.extend({
  template: require('./transaction-table.jade'),
  
  // collection: collection of transactions
  initialize: function () {
  },
  
  render: function () {    
    var el;
    
    // Help the view out by pulling headers from the collection
    if (this.collection.length > 0) {
      var x = this.collection.at(0);
      var headers = Object.keys(x);
      this.headers = headers;
    }
    
    // Since we don't use sub-views for the items just yet, 
    // hand the view a nice POJO instead of a collection.
    this.transactions = this.collection.toJSON();
    
    this.renderWithTemplate();        
    
    // Attach DataTable
    if (this.collection.length > 0) {
      var hiddenIndex = _.indexOf(this.headers, 'hidden');
      
      el = this.queryByHook('table');
      $(el).DataTable({
        lengthMenu: [[-1], ['All']],
        createdRow: function (row, data, index) {
          if (data[hiddenIndex] === 'true') {
            $(row).addClass('hidden');
          }          
        }
      });       
    }
  }
  
});
module.exports = TransactionTableView;