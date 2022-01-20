const fs = require('fs');
const { argv } = require('process');
const readline = require('readline');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { resolve, dirname, extname } = require('path');
const console = require('console');
const { JSDOM } = jsdom;
let dom;
let result; 
const nameFile = argv[2];
const userPath = resolve(process.argv[2]);
const dirPath = resolve(process.argv[1]);
const extFile = extname(nameFile);
const name_dir = dirname(userPath);



// Leo el archivo para obtener todos los links contenidos ahí 

module.exports = readFileMd = (userPath) => {
    fs.readFile(userPath, function (err, data) {
        if (err){
            console.log('error:', err);        
        }
        let lector = readline.createInterface({
            input: fs.createReadStream(userPath)
        });
        const pathlinks = [];
        lector.on("line", linea => {
            result = md.render(linea);
            dom = new JSDOM(result);            
            links = dom.window.document.querySelector("a");
            
            if (links){
                //console.log('text: ', link.textContent);
                //console.log('URL: ', links.href);
                pathlinks.push(links.href);
                console.log('links: ',pathlinks);
                console.log('tiene:', pathlinks.length, 'links');
            } else {
                console.log('el archivo no contiene links');
            }
        });
        return pathlinks    
    });
}

readFileMd(userPath);



















/* // imprimir para verificar process.argv
console.log(process.argv);
argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);    
}); */



