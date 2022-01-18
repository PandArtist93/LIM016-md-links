//console.log('hola mundo');
const os = require ('os');

console.log('estoy trabajando en:',os.platform());
console.log('la versión que tengo es:',os.release());
console.log('cuanta memoria tengo en total:',os.totalmem(), 'bytes');
console.log('cuanta memoria libre tengo:',os.freemem(), 'bytes');