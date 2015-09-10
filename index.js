var fs = require("fs");
delete require.cache[__filename];

var escapeRegex = function(s) {
  if (s) return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

module.exports = function (pattern) {
  var PATTERN = pattern || "SS";
  return function(name, value, suffix) {
    //console.log("Changing "+name+" to `" + value + "`");
    name = escapeRegex(name);
    suffix = escapeRegex(suffix);
    fs.readFile(module.parent.filename, "utf-8", function(err, data) {
      if(err) throw err;
      var match = "(\\/\\*" + PATTERN +
        (suffix ? ":" + suffix : "") +
        "\\*\\/.*?" + name + ".*?=).*;";
      var replace = '$1 '+JSON.stringify(value)+";";
      data = data.replace(RegExp(match, "gm"), replace);
      fs.writeFile(module.parent.filename, data, function(err) {
        if (err) throw err;
      });
    });
  };
};

