const { resolve, extname} = require('path');
const fs = require('fs');
const {searchAllFiles, filterMdFiles, readAllFileMd, validateLink } = require('../src/searchFiles.js');
const totalLinks = require('../src/options.js');
const readFileMd = require('../utils/getLinks.js')
const path = require('path');

module.exports = main = (path, options) => {
    const completePath = absolutePath(path);    
    processFiles(completePath, options);    
}


const absolutePath = (inputPath) => {
    if (!inputPath) {
        console.log("Debes ingresar una ruta valida y opciones válidas");
        process.exit(1);
    }
    const completePath = resolve(inputPath);
    
    if(!fs.existsSync(completePath)){
        console.log("El path solicitado no existe");
        process.exit(1);
    }
    return completePath
}

/* const processFiles = (completePath, options) => {
   
    if (!fs.statSync(completePath).isDirectory()) {
        console.log("Leeremos el archivo ingresado");  
        readFileMd(completePath).then(data =>{
            if (options.validate == true && options.stats == false){
                data.forEach(link => {
                    validateLink(link).then((data)=> {
                        console.log(data);
                    }).catch((data) => {
                        console.log(data);
                    })
                });
            }
            else if (options.validate == false && options.stats == true){
                console.log('deberia arrojar las estadisticas de los links');
            }
            else if (options.validate == true && options.stats == true){
                console.log('deberia arrojar las respuestas de las validaciones y las estadísticas de los links');
            }     
            else{
                readFileMd(completePath).then((data)=> {
                    console.log(data);
                }).catch((data) => {
                    console.log(data);
                });
            }      
        })
        return
    }
    console.log("buscamos todos los archivos .md contenidos en este directorio");
    const pathFiles = searchAllFiles(completePath);   
    const pathFilesMD = filterMdFiles(pathFiles);
    readAllFileMd(pathFilesMD);
    
}*/

const processFiles = (completePath, options) => {
   
    if (!fs.statSync(completePath).isDirectory()) {
        //console.log("Leeremos el archivo ingresado");  
        const ext = path.extname(completePath);
        let totalLinks = [];
        let uniqueLinks = [];
        let duplicateLinks = [];
        let brokenLinks = [];
        if (ext == '.md') {
            readFileMd(completePath).then(data =>{
                if (options.validate == true && options.stats == false){
                    data.forEach(link => {
                        validateLink(link).then((data)=> {
                            console.log(data);
                        }).catch((data) => {
                            console.log(data);
                        })
                    });
                }
                else if (options.validate == false && options.stats == true){
                    //console.log('deberia arrojar las estadisticas de los links');
                    data.forEach(link => {                        
                        totalLinks.push(link.href);
                    })
                    console.log('Links Totales: ', totalLinks.length); 
                    console.log('Links unicos: ', new Set (totalLinks).size);             
                }
                else if (options.validate == true && options.stats == true){
                    //console.log('deberia arrojar las respuestas de las validaciones y las estadísticas de los links');
                    data.forEach(link => {                        
                        totalLinks.push(link.href);
                    })                    
                    brokenLinks.push(totalLinks.filter((link) => link.status >= 400))
                    console.log('Links Totales: ', totalLinks.length); 
                    console.log('Links Rotos: ', brokenLinks.length);  
                    console.log('Links unicos: ', new Set (totalLinks).size);
                    console.log('Links repetidos: ', totalLinks.length - new Set (totalLinks).size);
                }     
                else{
                    readFileMd(completePath).then((data)=> {
                        console.log(data);
                    }).catch((data) => {
                        console.log(data);
                    });
                }      
            })
            return
        }
        else{
            console.log('No se puede leer el archivo porque no es Markdown');
        }
        return
    }
    console.log("buscamos todos los archivos .md contenidos en este directorio");
    const pathFiles = searchAllFiles(completePath);   
    const pathFilesMD = filterMdFiles(pathFiles);
    readAllFileMd(pathFilesMD);
    
}
