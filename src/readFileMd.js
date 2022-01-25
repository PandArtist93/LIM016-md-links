const fs = require('fs');
const argv = require('process');
const extname = require('path');
const console = require('console');
const { join, resolve, normalize, extname  } = require('path');
const path = require('path');
const userPath = resolve(process.argv[2]);
//const searchAllFiles = require('../src/searchFiles.js')


module.exports = FileMd = (userPath) => {
    console.log(userPath);
    if (userPath.extname == '.md') {
        if (userPath.extname == undefined){
            console.log('its a directory');
            //searchAllFiles(userPath);
        }      
    }    
    console.log('its a file');
        
}

FileMd(userPath);