# simple-save
A stupidly simple way of persisting values in nodejs.
This will rewrite tagged literal values that are assigned to variabled in your source code.

# Install
```bash
  npm install simple-save
```

# Usage
```js
  var save = require("simple-save")();
  /*SS*/ var test = 3;

  test = 5
  save("test", test);
```

If you want to set a custom tag instead of the default of `"SS"`, pass in a
string:
```js
  var save = require("simple-save")("SAVE");
```
