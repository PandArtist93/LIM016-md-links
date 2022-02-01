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
    console.log(chalk.bold.magentaBright(data));   
  });

  const inputPath = argv[2];
  const options = parseOptionalArguments();

  mdLinks(inputPath, options).then((objectLinks) => {
    formatOutput(objectLinks.flat(), options);
  }).catch(err => {
    console.log(err);
  });
};

const formatOutput = (linkObjects, options) => {
  if (options.stats && options.validate){   
    linkObjects.forEach(obj => {
      console.log(`${chalk.bgGreen.bold('Totales :')} ${chalk.greenBright(obj['allLinks'])} ${chalk.bgRed.bold('Rotos :')} ${chalk.redBright(obj['brokenLinks'])} ${chalk.bgBlue.bold('Unicos :')} ${chalk.blueBright(obj['uniqueLinks'])} ${chalk.bgMagenta.bold('Repetidos :')} ${chalk.magentaBright(obj['duplicateLinks'])} `)
    });
    //console.log(linkObjects);
  }
  else if (options.stats) {
    linkObjects.forEach(obj => {
      console.log(`${chalk.bgGreen.bold('Totales :')} ${chalk.greenBright(obj['allLinks'])} ${chalk.bgRed.bold('Unicos :')} ${chalk.redBright(obj['uniqueLinks'])} `)
    });
    //console.log(linkObjects);
  }
  else if (options.validate) {
    linkObjects.forEach(obj => {
      console.log(`${chalk.bgGreen.bold('file :')} ${chalk.greenBright(obj['file'])}  ${chalk.bgBlue.bold('href :')} ${chalk.blueBright(obj['href'])} ${chalk.bgRed.bold('ok :')} ${chalk.redBright(obj['ok'])} ${chalk.bgMagenta.bold('status :')} ${chalk.magentaBright(obj['status'])} `)
    });
    //console.log(linkObjects);
  }
  else{
    linkObjects.forEach(obj => {
      console.log(`${chalk.bgGreen.bold('file :')} ${chalk.greenBright(obj['file'])}  ${chalk.bgBlue.bold('href :')} ${chalk.blueBright(obj['href'])} ${chalk.bgCyan.bold('text :')} ${chalk.cyanBright(obj['text'])} `)
    });
    //console.log(linkObjects);
  }
}

main();