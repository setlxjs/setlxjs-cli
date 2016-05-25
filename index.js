'use strict';

const program = require('commander');
const fs = require('fs');
const path = require('path');
const version = require('./package.json').version;

const transpiler = require('setlxjs-transpiler');

program
  .version(version);

program
  .command('tree <expression>')
  .alias('t')
  .description('Creates the parse tree from an expression')
  .action(function (expression) {
    transpiler(expression, { tree: true })
      .then(function (tree) { console.log(tree.toString()) })
      .catch(console.error.bind(console));
  });

program
  .command('transpile <file>')
  .alias('c')
  .description('Compiles SetlX Sourcecode to JavaScript')
  .option('-o, --output <path>', 'File or dir to output result')
  .action(function (file, options) {
    // if input file is dir
    if (fs.lstatSync(file).isDirectory()) {
      const outputDir = options.output || file;

      fs.readdirSync(file).filter(function(file) {
        return path.extname(file) === '.stlx';
      }).forEach(function(name) {
        const baseName = path.basename(name, '.stlx');

        transpileFile(path.join(file, baseName + '.stlx'), path.join(outputDir, baseName + '.js'));
      });
    } else {
      let outputFile = options.output;
      // if output is a dir make js file
      if (outputFile && path.extname(outputFile) === '') {
        outputFile += path.basename(file, path.extname(file)) + '.js';
      }
      // if output is not specified change extension to js
      if (!outputFile) {
        outputFile = path.join(path.dirname(file), path.basename(file, path.extname(file)) + '.js');
      }

      transpileFile(file, outputFile);
    }
  });

program.parse(process.argv);

function transpileFile(file, output) {
  fs.readFile(file, function(err, fileContent) {
    if (err) throw err;
    transpiler(fileContent.toString())
      .then(function (result) {
        fs.writeFileSync(output, result);
      })
      .catch(console.error.bind(console));
  });
}
