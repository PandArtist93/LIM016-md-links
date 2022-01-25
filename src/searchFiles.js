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
        /* readFileMd(path).then(links => {
            console.log("Links");
            console.log(links)
        }) */
        //arrayLinks = arrayLinks.concat(readFileMd(path));
    })
    Promise.all(promises).then( data => {
        console.log(data.flat()); // para agrupar en un solo array los demas arrays internos
    })   
}

const searchLink = (link) => {
    return new Promise(function(resolve, reject){
        //console.log(link.link);
        fetch(link.link)
        .then(response => {
            
            link.status = response.status;
            //console.log(link.status);
            if (response.status == 200 || response.status == 201 || response.status == 204) {
                link.message = 'ok';
            }           
            else if (response.status == 400 || response.status == 401 || response.status == 404) {
                link.message = 'fail';
            }
            resolve(link);

        }).catch((response) => {
            console.log('entro en el catch');
            link.status = response.status;
            console.log(response);
            link.message = 'fail';
            reject(link);
        })
    });    
}


module.exports.searchAllFiles = searchAllFiles;
module.exports.filterMdFiles = filterMdFiles;
module.exports.readAllFileMd = readAllFileMd;
module.exports.searchLink = searchLink;
