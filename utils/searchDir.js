const fs = require('fs');
const path = require('path');
const { argv } = require('process');
const readline = require('readline');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { isAbsolute, resolve, dirname, basename, parse, extname } = require('path');
const console = require('console');
const { Console } = require('console');
const { JSDOM } = jsdom;
const {  } = require('./getLinks.js');

const userPath = resolve(process.argv[2]);
const nameFile = path.basename(userPath);
const extFile = extname(nameFile);
const name_dir = dirname(userPath);
let dom;
let result;

//verificando si es un directorio y path
module.exports = openDirectory = () => {
    fs.opendir((userPath),(err) => {
        let path_dir;
        if (err){
            console.log('Es un archivo');
            path_all = err.path;
            /* console.log('path: ', path_all);
            console.log('file: ', nameFile);
            console.log('ext: ', extFile); 
            console.log('dir: ', name_dir); */
            
            readFileMd(path_all);
        } else {
            console.log('Es un directorio');
            directoryPath();
        }
    });
}


// verificamos el path ingresado por el usuario 
const directoryPath = () => {
    fs.readdir(userPath, (err, data) => {
        if (err){
            console.log('hay un error!');
            console.log(err);            
        } else{
            read_directory(data);
        }
    })
}


// leemos el directorio
const read_directory = (data) => {
    const pathArray = [];
    let pathSubfile = '';
    // filtra los archivos que tenga como ext .md
    data.forEach(data => {
        const extnameFile = extname(data);
        const nameFile = basename(data);
        
        if (extnameFile === '.md') {
            pathSubfile = resolve(data);
            pathArray.push(pathSubfile);                   
        }else{
            console.log('no se encuentran archivos .md')
        }
    });
    console.log('archivos .md: ', pathArray.length);
    //console.log(pathSubfile);
} 

// verificamos si el path ingresado por el usuario existe 
const pathVerify = (userPath) => {
    fs.existsSync(userPath);
}
pathVerify(userPath);

// función que busca los archivos con extensión .md
const searchMdFiles = (path) => {
    return
}
searchMdFiles(userPath);