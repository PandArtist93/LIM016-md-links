const { argv } = require('process');
const process = require('process');
const chalk = require('chalk');
//const { console } = require('console');

// Helper functions 

const setOptions = (option, options) => {
    if (option) {
        const pseudoOption = option.replace(/-/g,'');
        if (pseudoOption == 'v' || pseudoOption == 'V' || pseudoOption == 'validate') {
            options['validate'] = true
        } 
        else if (pseudoOption == 's' || pseudoOption == 'S' || pseudoOption == 'stats') {
            options['stats'] = true
        }       
        else {
            console.log(chalk.bold.red('invalid Options'));
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
    return options
}

module.exports.parseOptionalArguments = parseOptionalArguments;