import people from './file.js';

function calculateAverageAge(peopleArray) {
    if (!peopleArray || peopleArray.length === 0) {
      return 0;
    }
    
    const totalAge = peopleArray.reduce((sum, person) => sum + person.age, 0);
    return totalAge / peopleArray.length;
}

const averageAge = calculateAverageAge(people);
console.log(`The average age is: ${averageAge.toFixed(2)} years`);