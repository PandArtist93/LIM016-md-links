const fs = require('fs');
const path = require('path');
//const readline = require("readline");
const NOMBRE_ARCHIVO = '../testFile2';
//const md = require('markdown-it')();
const jsdom = require("jsdom");
//const { JSDOM } = jsdom;
let dom;
let result;
let pathFile = path.extname(NOMBRE_ARCHIVO);
let pathDir = path.dirname(NOMBRE_ARCHIVO);


//leyendo un archivo línea a línea y obteniendo todos los links

/* fs.readFile(NOMBRE_ARCHIVO, function (err, data) {
    if (err){
        console.log('error:', err);
    }
    
    let lector = readline.createInterface({
        input: fs.createReadStream(NOMBRE_ARCHIVO)
    });
    
    lector.on("line", linea => {
        result = md.render(linea);
        dom = new JSDOM(result);
        //console.log(result);
        //console.log(typeof result);
        console.log('text: ', dom.window.document.querySelector("a").textContent);
        console.log('href: ', dom.window.document.querySelector("a").href);
        console.log('file: ', NOMBRE_ARCHIVO);
        //console.log(dom.window);
        //console.log("Tenemos una línea:", linea);
    })
}); */

//verificando si es un directorio y path

fs.opendir((NOMBRE_ARCHIVO),(err, data) => {
    let path_dir;
    if (err){
        console.log('No es un directorio, es un archivo');
        //console.log('error:', err);
        path_dir = err.path;
        console.log('path: ', err.path);
        console.log('file: ', NOMBRE_ARCHIVO);
        console.log('ext: ', pathFile); 
        //console.log(pathDir);
    } else {
        console.log('Es un directorio');
        //console.log('directory: ', pathDir);
        console.log(typeof data);
        //console.log(path_dir);
        console.log(data.read());
        //console.log(data.kDirPath);
    }
    
});

