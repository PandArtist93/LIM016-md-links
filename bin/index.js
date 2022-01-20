#! /usr/bin/env node

const { argv } = require('process');
const main = require('../src/main.js');
const parseOptionalArguments = require('../src/utils.js');


module.exports = mdLinks = () => {
  const inputPath = argv[2];
  const options = parseOptionalArguments();
  main(inputPath, options);
};

mdLinks();
