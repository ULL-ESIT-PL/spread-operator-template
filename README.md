

## Spread Operator Translator

Small utility, translates spread operator to ES5 alternatives.

## Installation

```
npm install git@github.com:ULL-ESIT-PL-2223/ast-types-nombre-apellido-aluxxxx.git
```

## Usage from code:

```javascript
const spread = require('spread');
const example_code = "function tutu(x, ...rest) { return x + rest[0]; }"

console.log("Original Code: \n", example_code);
console.log("Code without spread operators: \n", spread(example_code));
```

## Usage as executable:

An input file must be specified. You also may or may not specify an output file. If not given, it will default to "output.js".

```
spread input_file --o output_file
```

## Examples

```js
function restFun(...things) {
  return things[2];
}
```

Translates into:

```js
function restFun() {
  var things = Array.prototype.slice.call(arguments, 0);
  return things[2];
}

function tutu(x, ...rest) {
  return x + rest[0];
}
// TRANSLATES INTO:
function tutu(x, ...rest) {
  var things = Array.prototype.slice.call(arguments, 1);
  return x + rest[0];
}
```

## Author

aluxxxx (Nombre apellidos) - [GitHub Profile](https://github.com/aluxxxx)

## Tests

```
npm run test
```

## Version History

1.0.0 Initial Release
1.1.0 Added spread translation into array expressions
