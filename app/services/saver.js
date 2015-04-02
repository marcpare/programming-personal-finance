function Saver () {
  
}

Saver.prototype.save = function (json) {
  // check for saved location
  var exists = false;
  var path = localStorage.saveLocation;
  if (path) {
    var stats = fs.statSync(path);
    var exists = stats.isFile();
  }
  
  if (!exists) {
  }
  
  // check that file is there
  
  // missing: prompt for save location
  
  // then, pull from Mint
}

module.exports = Saver;