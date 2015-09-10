# simple-save
A stupidly simple way of persisting values in nodejs.
This will rewrite tagged literal values that are assigned to variables in your source code.


- No config files!
- No environment variables!
- No databases!

Persist hardcoded data in your source files like you've always wanted!

# Install
```bash
  npm install simple-save
```

# Usage

```js
save(variableName:string, newValue, [suffix:string])
```

Call the package with the name of the variable you want to persist, and the new
value. This will replace the assignments of all tagged occurrences of this
variable with the new value.

```js
  var save = require("simple-save")();
  /*SS*/ var test = 3;

  test = 5
  save("test", test);
```


# Advanced

If you want to set a custom tag instead of the default of `"SS"`, pass in a
string:
```js
  var save = require("simple-save")("SAVE");
```

You can also set custom tag suffixes on a per-variable basis as follows.  In the
following example, only the value of the variable within the function is modified.
```js
  var save = require("simple-save")();
  /*SS*/ var test = 3;

  function ttt(){
    /*SS:1*/ var test = 3;
  }

  test = 5
  save("test", test, "1");
```
