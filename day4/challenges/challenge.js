const greet = require('./greeting');
const displayColorfulMessage = require('./colorful-message');
const readFileContent = require('./files/read-file');

const userName = 'Ayman';
console.log(greet(userName));

displayColorfulMessage();

readFileContent();