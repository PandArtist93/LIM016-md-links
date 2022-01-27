const { argv } = require('process');

// Helper functions 

const setOptions = (option, options) => {
    const validOptions = ['v', 'validate', 's', 'stats'];
    
    if (option) {
        const pseudoOption = option.replace(/-/g,'');
        const result = validOptions.includes(pseudoOption)
        if (pseudoOption == 'v' || pseudoOption == 'validate') {
            options['validate'] = true
        } 
        else if (pseudoOption == 's' || pseudoOption == 'stats') {
            options['stats'] = true
        }       
        else {
            console.log('opción invalida');
            process.exit(1);
        }
    }
    return options;
}

const parseOptionalArguments = () => {
    let options = {
        validate: false,
        stats: false
    };

    const option1 = argv[3];
    const option2 = argv[4];
   
    options = setOptions(option1, options);    
    options = setOptions(option2, options);
    //console.log(options);
    return options
}

module.exports.parseOptionalArguments = parseOptionalArguments;