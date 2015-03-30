var moment = require('moment');
module.exports = {
  month: function (number) {
    return moment().month(number).format('MMMM');
  },
  dollars: function (cents) {
    return Math.round(cents / 100).toLocaleString();
  }
};