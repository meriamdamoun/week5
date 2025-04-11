const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));
console.log(chalk.red.bold('Error message'));
console.log(chalk.green.underline.bold('Success!'));

console.log(chalk.yellow.bgBlue.bold(' IMPORTANT NOTICE '));

console.log(chalk.rgb(123, 45, 67)('Custom RGB color'));
console.log(chalk.hsl(32, 100, 50)('Custom HSL color'));

const rainbow = chalk.red('R') + 
                chalk.yellow('a') + 
                chalk.green('i') + 
                chalk.blue('n') + 
                chalk.magenta('b') + 
                chalk.cyan('o') + 
                chalk.white('w');
console.log(rainbow);

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.green;

console.log(error('Error!'));
console.log(warning('Warning!'));
console.log(success('Success!'));