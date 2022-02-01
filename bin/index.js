#! /usr/bin/env node

const { argv } = require('process');
//const { console } = require('console');
const { mdLinks } = require('../src/mdLinks.js');
const { parseOptionalArguments } = require('../src/utils.js');
const figlet = require('figlet');
const chalk = require('chalk');

const main = () => {
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

  mdLinks(inputPath, options).then((objectLinks) => {
    console.log('probando la promesa de mdLinks');
    console.log(objectLinks.flat());
  }).catch(err => {
    reject(err)
  });
};

main();