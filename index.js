var fs = require("fs");
delete require.cache[__filename];

module.exports = function (pattern) {
  var PATTERN = pattern || "SS";
  return function(name, value) {
    //console.log("Changing "+name+" to `" + value + "`");

    fs.readFile(module.parent.filename, "utf-8", function(err, data) {
      if(err) throw err;
      var match = "(\\/\\*"+PATTERN+"\\*\\/.*?"+name+".*?=).*;";
      var replace = '$1 '+JSON.stringify(value)+";";
      data = data.replace(RegExp(match, "gm"), replace);
      fs.writeFile(module.parent.filename, data, function(err) {
        if (err) throw err;
      });
    });
  };
};
