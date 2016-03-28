const program = require('commander');
const fs = require('fs');
const path = require('path');

const transpiler = require('setlxjs-transpiler');

program
  .version('0.1.0');

program
  .command('tree <expression>')
  .alias('t')
  .description('Creates the parse tree from an expression')
  .action(function(expression) {
    transpiler(expression, { tree: true })
      .then(tree => console.log(tree.toString()))
      .catch(console.error.bind(console));
  });

program.parse(process.argv);
