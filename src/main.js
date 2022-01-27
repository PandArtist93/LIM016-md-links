const { resolve } = require('path');
const fs = require('fs');
const { searchAllFiles, filterMdFiles, readAllFileMd } = require('../src/searchFiles.js');
const { linksValidated, linkStats, statsAndValidateLinks } = require('../src/options.js');

const main = (path, options) => {
    const completePath = absolutePath(path);    
    processFiles(completePath, options);    
}

const absolutePath = (inputPath) => {
    if (inputPath == undefined) {
        console.log("Debes ingresar una ruta valida y opciones válidas");
        process.exit(1);
    }
    const completePath = resolve(inputPath);
    
    if(!fs.existsSync(completePath)){
        console.log("El path solicitado no existe");
        process.exit(1);
    }
    return completePath
}

const processFiles = (completePath, options) => {
    const pathFiles = searchAllFiles(completePath);  // nos retorna un arreglo con los path
    const pathFilesMD = filterMdFiles(pathFiles); // nos retorna un arreglo con paths que tienen como ext (.md)
    const promisesFiles = readAllFileMd(pathFilesMD);  // lee y extrae los links contenido en cada uno de los archivos para retornarlos en un arreglo 
    //processOptions(completePath, options);  
    if (options.validate == true && options.stats == false){
        linksValidated(promisesFiles);      
    }
    else if (options.validate == false && options.stats == true){
        linkStats(promisesFiles);              
    }
    else if (options.validate == true && options.stats == true){
        statsAndValidateLinks(promisesFiles);           
    }
    else{
        promisesFiles.then( data => {
            console.log(data.flat());
        })
    }
}

module.exports.main = main;