var fs = require("fs");
delete require.cache[__filename];

function escapeRegex(s) {
  if (s) return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

function escapeDollar(s) {
  if (s) return s.replace(/[$]/g, '$$$$');
};

module.exports = function (pattern) {
  var PATTERN = pattern || "SS";
  return function(name, value, suffix) {
    name = escapeRegex(name);
    suffix = escapeRegex(suffix);
    if (typeof value === "function"){
	value = value.toString();
    } else {
    	value = JSON.stringify(value);
    }
    value = escapeDollar(value);
    //console.log("Changing "+name+" to `" + value + "`");
    fs.readFile(module.parent.filename, "utf-8", function(err, data) {
      if(err) throw err;
      var match = "(\\/\\*" + PATTERN +
        (suffix ? ":" + suffix : "") +
        "\\*\\/.*?" + name + ".*?=).*;";
      var replace = '$1 '+value+";";
      //console.log(RegExp(match, "gm").exec(data));
      data = data.replace(RegExp(match, "gm"), replace);
      fs.writeFile(module.parent.filename, data, function(err) {
        if (err) throw err;
      });
    });
  };
};

