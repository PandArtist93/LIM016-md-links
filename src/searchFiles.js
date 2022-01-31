const fs = require('fs');
const { join, resolve, normalize } = require('path');
const path = require('path');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// const chalk = require('chalk');
let dom;
let result; 
let links;

//search all files includes that into a directory or subdirectory and return a array with them
const searchAllFiles = (userPath) => {
    if(!fs.statSync(userPath).isDirectory()) {
        return [userPath]
    }
    let arrayContainerAllFiles = [];
    const readDirectorySync = fs.readdirSync(userPath);
    readDirectorySync.forEach(directoryFile => {
        pathFile = normalize(resolve(join(userPath, directoryFile)));

        if (fs.statSync(pathFile).isDirectory()) {
            arrayContainerAllFiles = arrayContainerAllFiles.concat(searchAllFiles(pathFile))
        } 
        else {
            arrayContainerAllFiles.push(pathFile);
        }    
    }); 
    return arrayContainerAllFiles;
} 

// filter the files for your type of extencion (.md) and return a array with them 
const filterMdFiles = (pathFiles) => {
    let arrayFilesMd = [];
    pathFiles.forEach(file => {
        const ext = path.extname(file);
        if (ext == '.md') {
            arrayFilesMd.push(file);                      
        }   
    })
    return arrayFilesMd;
}

// read each file and extract the includes links, to return an object with them into a array
const readFileMd = (userPath) => {
    return new Promise(function(resolve, reject){
        fs.readFile(userPath, 'utf8', (err, data) => {
            if (err) {                
                reject (err);
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
                //resolve (chalk.blue(totalLinks));
                resolve (totalLinks);
            }
        }); 
    }); 
}

// wait for all the promises to be fulfilled, to return a unique promise with all them
const readAllFileMd = (pathFiles) => {
    const promises = [];
    pathFiles.forEach(pathFile => {
        promises.push(readFileMd(pathFile));       
    })
    return Promise.all(promises)// to join all the promises in one
}

module.exports.searchAllFiles = searchAllFiles;
module.exports.filterMdFiles = filterMdFiles;
module.exports.readFileMd = readFileMd;
module.exports.readAllFileMd = readAllFileMd;