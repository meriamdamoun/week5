const chalk = require('chalk');

function displayColorfulMessage() {
    const message = chalk.blue.bold('Hello,bye!');
    console.log(message);
}

module.exports = displayColorfulMessage;