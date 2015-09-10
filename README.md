# simple-save
A stupidly simple way of persisting values in nodejs.
This will rewrite tagged literal values that are assigned to variabled in your source code.

# Usage
var save = require("simple-save")();
```js
  /*SS*/ var test = 3;

  test = 5
  save("test", test);
```
