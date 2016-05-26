# SetlX.js Command Line interface

This is the Node.js command line interface for the SetlX.js transpiler.

## Usage

### transpile [--output <outpath>] <filepath>

Transpile a SetlX file to JavaScript.

`<filepath>`: file or directory with `.stlx` files

`--output <outpath>`: file or directory to output the file(s) to

### run <file>

Run a SetlX file with SetlX.js. The file gets transpiled internally and is then run with Node.js.

### tree <expression>

Display the abstract syntax tree of a SetlX expression.
