#! /usr/bin/env node

const { argv } = require('process');
//const { console } = require('console');
const { main } = require('../src/main.js');
const { parseOptionalArguments } = require('../src/utils.js');
const figlet = require('figlet');
const chalk = require('chalk');

const mdLinks = () => {
  figlet("Welcome to Md-Links!", function (err, data) {
    if (err) {
      console.log("something is wrong...");
      console.dir(err);
      return;
    } 
    console.log(chalk.red(data));   
  });
  const inputPath = argv[2];
  const options = parseOptionalArguments();
  main(inputPath, options);
};

mdLinks();