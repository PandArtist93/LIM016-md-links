const fs = require('fs');
const { argv } = require('process');
const readline = require('readline');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { dirname, extname } = require('path');
const path = require('path');
const console = require('console');
//const { fileURLToPath } = require('url');
const { JSDOM } = jsdom;
let dom;
let result; 
let links;
const nameFile = argv[2];
const userPath = path.resolve(process.argv[2]);
const dirPath = path.resolve(process.argv[1]);
const extFile = extname(nameFile);
const name_dir = dirname(userPath);



// Leo el archivo para obtener todos los links contenidos ahí 

module.exports = readFileMd = (userPath) => {
    return new Promise(function(resolve, reject){
        fs.readFile(userPath, 'utf8', (err, data) => {
            if (err) {
                //console.log(err);
                reject(err);
            } 
            else {
                result = md.render(data);
                dom = new JSDOM(result);
                let totalLinks = [];
                links = dom.window.document.querySelectorAll("a");        
                links.forEach(link => {
                    totalLinks.push({
                        href: link.href, 
                        text: (link.textContent).substring(0, 50),
                        file: path.resolve(userPath)
                    });
                });
                resolve(totalLinks);
            }
        
        }); 
    }); 
}
























