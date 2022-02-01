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
    return new Promise(function(resolve, reject){
        promises.then( data => {
            data = data.flat();
            const links = allLinks(data);       
            const uniqueLinks = searchUniqueLinks(links);
            const outputFormat = {
                allLinks: links.length, 
                uniqueLinks: uniqueLinks
            }
            resolve([outputFormat])
        }).catch(err => {
            reject(err)
        });      
    });   
}

const statsAndValidateLinks = (promises) => {
    return new Promise(function(resolve, reject){
        promises.then( data => {
            data = data.flat();
            const links = allLinks(data);
            const brokenLinks = searchBrokenLinks(data);
            const uniqueLinks = searchUniqueLinks(links);
            const duplicateLinks = links.length - uniqueLinks;
            const outputFormats = {
                allLinks: links.length, 
                brokenLinks: brokenLinks,
                uniqueLinks: uniqueLinks,
                duplicateLinks: duplicateLinks
            }
            resolve([outputFormats])
        }).catch(err => {
            reject(err) 
        });   
    });    
}

// process Options functions
const processOptions = (promisesFiles, options) => {
    if (options.validate == true && options.stats == false){
        return validateAllLinks(promisesFiles);      
    }
    else if (options.validate == false && options.stats == true){
        return linkStats(promisesFiles);              
    }
    else if (options.validate == true && options.stats == true){
        return statsAndValidateLinks(validateAllLinks(promisesFiles));           
    }
    else{
        return promisesFiles;
    }
}
module.exports.linkStats = linkStats;
module.exports.statsAndValidateLinks = statsAndValidateLinks;
module.exports.processOptions = processOptions;
module.exports.validateLinkResp = validateLinkResp;
module.exports.validateAllLinks = validateAllLinks;
module.exports.allLinks = allLinks;
module.exports.searchBrokenLinks = searchBrokenLinks;
module.exports.searchUniqueLinks = searchUniqueLinks;