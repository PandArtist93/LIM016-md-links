#! /usr/bin/env node

const { argv } = require('process');
const { main } = require('../src/main.js');
const { parseOptionalArguments } = require('../src/utils.js');


const mdLinks = () => {
  
  const inputPath = argv[2];
  options = parseOptionalArguments();
  main(inputPath, options);
};

mdLinks();