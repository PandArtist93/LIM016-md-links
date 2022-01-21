const fs = require('fs');
const { argv } = require('process');
const readline = require('readline');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { resolve, dirname, extname, isAbsolute } = require('path');
const console = require('console');
const { fileURLToPath } = require('url');
const { JSDOM } = jsdom;
let dom;
let result; 
const nameFile = argv[2];
const userPath = resolve(process.argv[2]);
const dirPath = resolve(process.argv[1]);
const extFile = extname(nameFile);
const name_dir = dirname(userPath);



// Leo el archivo para obtener todos los links contenidos ahí 

/* const readFileMd = (userPath) => {
    fs.readFile(userPath, function (err, data) {
        if (err){
            throw err     
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
               
                pathlinks.push({
                    link: links.href, 
                    text: (links.textContent).substring(0, 50),
                    file: resolve(userPath)
                });
                
                console.log('tiene:', pathlinks.length, 'links');
            } else {
                console.log('el archivo no contiene links');
            }
            console.log(pathlinks);
        });
        
        return pathlinks    
    });
} */

const mdFile = extname(userPath) ==='.md';
const pathAbsolut = isAbsolute(userPath);


module.exports = readFileMd = (userPath) => {
    fs.readFile(userPath, function (err, data) {
        if (err){
            throw err     
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
                pathlinks.push({
                    link: links.href, 
                    text: (links.textContent).substring(0, 50),
                    file: resolve(userPath)
                });
                
                console.log('tiene:', pathlinks.length, 'links');
            } else {
                console.log('el archivo no contiene links');
            }
            console.log(pathlinks);
        });
        
        return pathlinks    
    });
}
readFileMd(userPath);






















