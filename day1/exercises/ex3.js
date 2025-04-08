
const promise1 = Promise.resolve(3);
const promise2 = Promise.reject("Boo!");

//Test 3
console.log("Exercise 3 results:");
promise1.then(value => {
    console.log("Resolved promise with value:", value);
});

promise2.catch(error => {
    console.log("Rejected promise with error:", error);
});