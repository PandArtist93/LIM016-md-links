#! /usr/bin/env node

/* const yargs = require("yargs");
const path = require('path');
//const getLinks = require('./getLinks.js');

const usage = "\nUsage: md-links <path-to-file> options a validar";
const options = yargs
.usage(usage)  
.option(
{'validate': {
    describe: "validando los links.", 
    type: "boolean", 
    demandOption: false 
  }
},
{'stats': {
    describe: "check stats.", 
    type: "boolean", 
    demandOption: false 
  }
})
.help(true)    
.argv;

if (yargs.argv.validate){
  console.log("recibí como argumento --validate")
  console.log('validate: ', yargs.argv.validate);
  
}
if (yargs.argv.stats){
  console.log("recibí como argumento --stats")
  console.log('stats: ', yargs.argv.stats);
} 
 */


const fs = require('fs');
const path = require('path');
const { argv } = require('process');
const readline = require('readline');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { isAbsolute, resolve, dirname, basename, parse, extname } = require('path');
const { JSDOM } = jsdom;
const openDirectory = require('../utils/searchDir.js');

const userPath = resolve(process.argv[2]);
const nameFile = basename(process.argv[2]);
const extFile = extname(nameFile);
let options = '';


module.exports = mdLinks = () => {
  if (process.argv.length == 2) {
    console.log('Debes ingresar una ruta');
  }
  else if (process.argv.length == 3) {
    console.log('desea continuar sin agregar opciones?');
  }
  else if (process.argv.length >= 4) {
    if (process.argv[3] == '--validate') {
      options = process.argv[3];
      console.log('path: ', userPath);
      console.log('file: ', nameFile);
      console.log('ext: ', extFile);
      console.log('options: ', options);
      //console.log(require('../utils/searchDir.js'));
      console.log(openDirectory)
      openDirectory(userPath);
      console.log('ahora debemos hacer la petición HTTP para verificar si el link funciona');
    }
    else if (process.argv[3] == '--stats') {
      options = process.argv[3];
      console.log('path: ', userPath);
      console.log('file: ', nameFile);
      console.log('ext: ', extFile);
      console.log('options: ', options);
      openDirectory(userPath);
      console.log('returnamos las estadísticas  de los links');
    }
    else if (process.argv[3] == '--stats--validate') {   
      console.log('son dos options');
      console.log('entro en validaciones y stats');
    }
  }
};

mdLinks();
