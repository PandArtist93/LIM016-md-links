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

const allLinks = (arrayLinks) => {
    return arrayLinks.map( (linkObj) => { return linkObj.href })
}

const searchBrokenLinks = (arrayLinks) => {
    return arrayLinks.filter( linkObj =>  linkObj.status >= 404 ).length
}

const searchUniqueLinks = (links) => {
    return new Set (links).size
}

const linkStats = (promises) => {    
    promises.then( data => {
        data = data.flat();
        const links = allLinks(data);       
        const uniqueLinks = searchUniqueLinks(links);
        console.log('Links Totales: ', links.length);
        console.log('Links unicos: ', uniqueLinks);
    })       
}

const statsAndValidateLinks = (promises) => {
    promises.then( data => {
        data = data.flat();
        const links = allLinks(data);
        const brokenLinks = searchBrokenLinks(data);
        const uniqueLinks = searchUniqueLinks(links);
        const duplicateLinks = links.length - uniqueLinks;
        console.log('Links Totales: ', links.length); 
        console.log('Links Rotos: ', brokenLinks);  
        console.log('Links unicos: ', uniqueLinks);
        console.log('Links repetidos: ', duplicateLinks);
    })      
}

// process Options functions
const processOptions = (promisesFiles, options) => {
    if (options.validate == true && options.stats == false){
        linksValidated(promisesFiles);      
    }
    else if (options.validate == false && options.stats == true){
        linkStats(promisesFiles);              
    }
    else if (options.validate == true && options.stats == true){
        statsAndValidateLinks(validateAllLinks(promisesFiles));           
    }
    else{
        promisesFiles.then( data => {
            console.log(data.flat());
        })
    }
}
module.exports.linkStats = linkStats;
module.exports.linksValidated = linksValidated;
module.exports.statsAndValidateLinks = statsAndValidateLinks;
module.exports.processOptions = processOptions;
module.exports.validateLinkResp = validateLinkResp;
module.exports.validateAllLinks = validateAllLinks;
module.exports.allLinks = allLinks;
module.exports.searchBrokenLinks = searchBrokenLinks;
module.exports.searchUniqueLinks = searchUniqueLinks;