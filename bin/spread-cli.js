#!/usr/bin/env node
import { program } from 'commander';
import * as fs from 'fs';
import { spread } from '../src/spread.js';

"use strict";

program
  .version("1.0.0")
  .name('spread')
  .arguments("<filename>")
  .description("A simple utility. Translates ES6 spread operator to ES5", {
    filename: 'file with the original code'
  })
  .option("-o, --output <filename>", "Output File", "output.js")
  .action((filename, options) => {
    transpile(filename, options.output);
  });

program.parse(process.argv);

/**
 * A function that takes two file names, reads from the input one and writes
 * the result to the output one
 * @param {string} input_file The file from which to read the code
 * @param {string} output_file The file to which to write the code with the logs
 * @private
 */
function transpile(input_file, output_file) {
  fs.readFile(input_file, 'utf-8', (err, input) => {
    if (err) {
      console.log("Couldn't read the file: " + err);
      return;
    }
    console.log("File read succesfully");
    fs.writeFile(output_file, spread(input), (err) => {
      if (err) {
        console.log("Couldn't write the output to " + output_file + ": " + err);
        return;
      }
      console.log("Output written succesfully in " + output_file);
    });
  });
} 
