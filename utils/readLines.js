const fs = require('fs');
const path = require('path');
const { argv } = require('process');
const readline = require("readline");
//const NOMBRE_ARCHIVO = '../data/testFile.md';
const NOMBRE_ARCHIVO = argv[2];
const md = require('markdown-it')();
let result; 

fs.readFile(NOMBRE_ARCHIVO, function (err, data) {
    if (err){
        console.log('error:', err);
    }
    
    let lector = readline.createInterface({
        input: fs.createReadStream(NOMBRE_ARCHIVO)
    });
    
    lector.on("line", linea => {
        result = md.render(linea);
        console.log(result);
        //console.log(typeof result);
        //console.log("Tenemos una línea:", result);
    });    
});

