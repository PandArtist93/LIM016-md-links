const console = require('console');
const fetch = require('node-fetch');

// validate functions
const validateLinkResp = (link) => { 
    return new Promise(function(resolve, reject){
        fetch(link.href).then(response => {       //here we do the request http to check the links
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

const validateAllLinks = (promises) => {
    return new Promise(function(resolve, reject){
        const linkPromises = [];
        promises.then((linkObjects) => {
            linkObjects = linkObjects.flat();
            linkObjects.forEach(linkObj => {
                linkPromises.push(validateLinkResp(linkObj));
            }); 
            resolve(Promise.all(linkPromises))
        }).catch(err => {
            reject(err)
        });
    })
}

const linksValidated = (promises) => {
    validateAllLinks(promises).then((data) => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

// stats functions
const totalLinks = (arrayPromises) => {
    let totalLinks = [];
    const arrayWithAllPromises = arrayPromises.flat();       // revisar                 
    arrayWithAllPromises.forEach(link => {
        totalLinks.push(link.href);
    })
    return totalLinks
}

const linkStats = (promises) => {
    let totalLinks = [];
    let uniqueLinks = [];
    promises.then( data => {
        const arrayWithAllPromises = data.flat();                        
        arrayWithAllPromises.forEach(link => {
            totalLinks.push(link.href);
        })
        uniqueLinks = new Set (totalLinks).size;
        console.log('Links Totales: ', totalLinks.length); 
        console.log('Links unicos: ', uniqueLinks);  
    })        
}

const statsAndValidateLinks = (promises) => {
    let totalLinks = [];
    let uniqueLinks = [];
    let duplicateLinks = [];
    let brokenLinks = [];
    promises.then( data => {
        const arrayWithAllPromises = data.flat();                        
        arrayWithAllPromises.forEach(link => {
            totalLinks.push(link.href);
        })            
        brokenLinks.push(totalLinks.filter((link) => link.status >= 400))
        uniqueLinks = new Set (totalLinks).size;
        duplicateLinks = totalLinks.length - new Set (totalLinks).size;
        console.log('Links Totales: ', totalLinks.length); 
        console.log('Links Rotos: ', brokenLinks.length);  
        console.log('Links unicos: ', uniqueLinks);
        console.log('Links repetidos: ', duplicateLinks);
    })      
}

// process Options functions
const processOptions = (promisesFiles, options) => {
    switch (options) {
        case (options.validate == true && options.stats == false):
            linksValidated(promisesFiles);
        break;
        case (options.validate == false && options.stats == true):
            linkStats(promisesFiles);
        break;
        case (options.validate == true && options.stats == true):
            statsAndValidateLinks(promisesFiles);
        break;
        default:
            promisesFiles.then( data => {
                console.log(data.flat());
            })
        break;
    }
}
module.exports.linkStats = linkStats;
module.exports.linksValidated = linksValidated;
module.exports.statsAndValidateLinks = statsAndValidateLinks;
