//const { argv } = require('process');
const { resolve, basename, extname } = require('path');
const fs = require('fs');
const {searchAllFiles, filterMdFiles, readAllFileMd, searchLink } = require('../src/searchFiles.js');
const readFileMd = require('../utils/getLinks.js')

module.exports = main = (path, options) => {
    const completePath = absolutePath(path);
    processFiles(completePath);
}


const absolutePath = (inputPath) => {
    if (!inputPath) {
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

const processFiles = (completePath) => {
   
    if (!fs.statSync(completePath).isDirectory()) {
        console.log("Leeremos el siguiente archivo");  
        readFileMd(completePath).then(data =>{
            data.forEach(link => {
                searchLink(link).then((data)=> {
                    console.log(data);
                }).catch((data) => {
                    console.log(data);
                })
            });
                
        })
        return
    }
    console.log("creamos la lista de archivos");
    const pathFiles = searchAllFiles(completePath);   
    const pathFilesMD = filterMdFiles(pathFiles);
    readAllFileMd(pathFilesMD);
}


