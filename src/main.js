const { argv } = require('process');
const {  resolve, basename, extname } = require('path');
const fs = require('fs');
const { getCompletion } = require('yargs');

module.exports = main = (path, options) => {
    const completePath = absolutePath(path);
    processFiles(completePath);
}


const absolutePath = (inputPath) => {
    if (!inputPath) {
        console.log("Debes ingresar una ruta valida");
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
        console.log("Leeremos el archivo viene en una lista ");
        return
    }
    console.log("cremoas  la lista de archivos");
    console.log('Leemos los archivos');
}


