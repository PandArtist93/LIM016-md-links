const { resolve } = require('path');
const chalk = require('chalk');
const fs = require('fs');
const process = require('process');
const { searchAllFiles, filterMdFiles, readAllFileMd } = require('../src/searchFiles.js');
const { processOptions } = require('../src/options.js');

const main = (path, options) => {
    const completePath = absolutePath(path);   
    processFiles(completePath, options);    
}

const absolutePath = (inputPath) => {
    if (inputPath == undefined) {
        console.log(chalk.bold.red('Debes ingresar una ruta valida y opciones válidas'));
        process.exit(1);
    }
    const completePath = resolve(inputPath);
    
    if(!fs.existsSync(completePath)){
        console.log(chalk.bold.red("El path solicitado no existe"));
        process.exit(1);
    }
    return completePath
}

const processFiles = (completePath, options) => {
    const pathFiles = searchAllFiles(completePath);  // nos retorna un arreglo con los path
    const pathFilesMD = filterMdFiles(pathFiles); // nos retorna un arreglo con paths que tienen como ext (.md)
    const promisesFiles = readAllFileMd(pathFilesMD);  // lee y extrae los links contenido en cada uno de los archivos para retornarlos en un arreglo 
    processOptions(promisesFiles, options);  
}

module.exports.main = main;