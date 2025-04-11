//math.js
module.exports.add = function(a, b) {
    return a + b;
};

module.exports.multiply = function(a, b) {
    return a * b;
};

//app.js
const _ = require('lodash');
const math = require('./math');

const sum = math.add(5, 10);
console.log(`The sum of 5 and 10 is: ${sum}`);

const product = math.multiply(5, 10);
console.log(`The product of 5 and 10 is: ${product}`);

const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = _.shuffle(numbers);
console.log(`Shuffled numbers: ${shuffledNumbers}`);