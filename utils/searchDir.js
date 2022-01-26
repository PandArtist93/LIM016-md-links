const fs = require('fs');
const path = require('path');
const { argv } = require('process');
const readline = require('readline');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { isAbsolute, resolve, dirname, basename, parse, extname } = require('path');
const console = require('console');
const { JSDOM } = jsdom;
const { readDirectory } = require('../src/searchFiles.js');

const userPath = resolve(process.argv[2]);
const nameFile = path.basename(userPath);
const extFile = extname(nameFile);
const name_dir = dirname(userPath);
let dom;
let result;

//verificando si es un directorio y path
module.exports = openDirectory = () => {
    //let test = directoryPath(userPath);
    readDirectory(userPath);
    //console.log(test);
    /* fs.opendir((userPath),(err, dir) => {
        let files = [];
        if (err){
            console.log('Es un archivo');
            path_all = err.path;
            readFileMd(userPath);
        } else {
            
            console.log(files);
            directoryPath();
        }
    }); */
}


// verificamos el path ingresado por el usuario 
const directoryPath = (userPath) => {
    console.log(userPath);
    let test = '';
    fs.readdir(userPath, (err, data) => {
        console.log('estoy here');
        if (err){
            console.log('hay un error!');
            console.log('enrta aca?');
            console.log(err);            
        } else{
            test = data;
            console.log('paso?');
            read_directory(test);
        }
        return pathArray
    });
    
}


// leemos el directorio
const read_directory = (data) => {
    const pathArray = [];
    let pathSubfile = '';
    let file = '';
    // filtra los archivos que tenga como ext .md
    data.forEach(data => {
        const extnameFile = extname(data);
        
        if (extnameFile === '.md') {
            pathSubfile = resolve(data);
            file = userPath + '\\' + data;
            pathArray.push(file); 
            //console.log(pathSubfile);                
        }
    });
    console.log('archivos .md: ', pathArray.length);
    console.log(pathArray);
    return pathArray
} 


openDirectory();