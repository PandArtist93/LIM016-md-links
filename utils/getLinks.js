const fs = require('fs');
const path = require('path');
const readline = require('readline');
const NOMBRE_ARCHIVO = '../testFile1.md';
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { Console } = require('console');
const { JSDOM } = jsdom;
let dom;
let result; 
let pathFile = path.extname(NOMBRE_ARCHIVO);
let pathDir = path.dirname(NOMBRE_ARCHIVO);

// Leo el archivo para obtener todos los links contenidos ahí 
fs.readFile(NOMBRE_ARCHIVO, function (err, data) {
    if (err){
        console.log('error:', err);        
    }
    
    let lector = readline.createInterface({
        input: fs.createReadStream(NOMBRE_ARCHIVO)
    });
    
    lector.on("line", linea => {
        result = md.render(linea);
        dom = new JSDOM(result);
        link = dom.window.document.querySelector("a");
        //text = dom.window.document.querySelector("p");
        
        if (link){
            console.log('text: ', link.textContent);
            console.log('href: ', link.href);                      
        } 
    });
});


// verificando si es un directorio
if (pathFile == ''){
    console.log('directory: ', pathDir);
    console.log('Es un directorio!');                      
} else{
    console.log('No es un directorio, es un archivo');
    console.log('file: ', NOMBRE_ARCHIVO);
    console.log('ext: ', pathFile); 
}