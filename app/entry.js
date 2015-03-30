/*

This is the entry-point for node-webkit.

*/

require('nw.gui').Window.get().showDevTools()
window.app = {
  services: require('./services');
};