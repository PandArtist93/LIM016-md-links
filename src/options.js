const fetch = require('node-fetch');

const validateLink = (link) => {
    return new Promise(function(resolve, reject){
        //console.log(link.link);
        fetch(link.href)
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

const totalLinks = (arrayWithLink) => {
    const numTotalLinks = arrayWithLink.map(link => link.href).length;
    return numTotalLinks
}

const brokenLiks = (link) => {

}

const uniqueLinks = (link) => {

}


module.exports.validateLink = validateLink;
module.exports.totalLinks = totalLinks;
module.exports.brokenLiks = brokenLiks;
module.exports.uniqueLinks = uniqueLinks;