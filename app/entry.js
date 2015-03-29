/*

This is the entry-point for node-webkit.

*/

// So that we can use Node's require in Browersify'd modules:
noderequire = require;
nodeprocess = process;
require('nw.gui').Window.get().showDevTools()