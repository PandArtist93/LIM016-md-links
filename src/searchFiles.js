const fs = require('fs');
const argv = require('process');
const extname = require('path');
const console = require('console');
const { join, resolve, normalize } = require('path');
const path = require('path');
const userPath = process.argv[2];
//const readFileMd = require ('../utils/getLinks.js')

/* module.exports = searchAllFiles = (userPath) => {
    fs.readdir(userPath, (err, files) => {
        if (err){
            throw err;
        }
        //console.log(files);   
        
        files.forEach(file => {
            const ext = extname(file);
            const pathFile = userPath + '\\' + file;
            const arrayFileContent = [];
            fs.readFile(pathFile, 'UTF-8', (err, contentFile) => {
                if (err){
                    throw err;
                }  
                arrayFileContent.push(contentFile);  
                console.log(file);        
                console.log(arrayFileContent);  
            })
        });   
    })
} */

module.exports = searchAllFiles = (userPath) => {
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
    /* let arrayContainerAllFilesMd = [];
    let tempArray = '';
    arrayContainerAllFiles.forEach(file => {
        tempArray = readFileMd(file);
        arrayContainerAllFilesMd.push(tempArray);
    })
    return arrayContainerAllFilesMd; */
}


const result = searchAllFiles(userPath);
console.log(result);