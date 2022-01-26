const fs = require('fs');
const argv = require('process');
const console = require('console');
const { join, resolve, normalize } = require('path');
const path = require('path');
const userPath = process.argv[2];
const readFileMd = require ('../utils/getLinks.js');
const fetch = require('node-fetch');
const { builtinModules } = require('module');


const searchAllFiles = (userPath) => {
    if(!fs.statSync(userPath).isDirectory()) {
        return userPath
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

const readAllFileMd = (pathFiles) => {
    
    const promises = []
    pathFiles.forEach(pathFile => {
        promises.push(readFileMd(pathFile));       
    })
    Promise.all(promises).then( data => {
        console.log(data.flat()); // para agrupar en un solo array los demas arrays internos
        
    })   
}


const validateLink = (link) => {
    return new Promise(function(resolve, reject){
        //console.log(link.link);
        fetch(link.link)
        .then(response => {            
            link.status = response.status;            
            if (response.status >= 200 && response.status <= 399) {
                link.ok = 'ok';
            }           
            else{
                link.ok = 'FAIL';
            }
            resolve(link);
        }).catch((response) => {
            link.status = response.status;
            console.log(response);
            link.ok = 'FAIL';
            reject(link);
        })
    });    
}


module.exports.searchAllFiles = searchAllFiles;
module.exports.filterMdFiles = filterMdFiles;
module.exports.readAllFileMd = readAllFileMd;
module.exports.validateLink = validateLink;

