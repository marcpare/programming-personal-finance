/*

This is the entry-point for node-webkit.

*/

require('nw.gui').Window.get().showDevTools()

window.App = {
  services: require('./app/services')
};

require('underscore').mixin({
  sum: function (list) {
    return this.reduce(list, function (memo, num) { return memo + num; }, 0);
  }
});
