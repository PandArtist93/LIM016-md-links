const fs = require('fs');

fs.writeFile('./name.md','linea uno', function(err){
    if (err){
        console.log(err);
    }
    console.log('el archivo fue creado'); 
})