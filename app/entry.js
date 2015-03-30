/*

This is the entry-point for node-webkit.

*/

require('nw.gui').Window.get().showDevTools()

window.App = {
  services: require('./app/services')
};