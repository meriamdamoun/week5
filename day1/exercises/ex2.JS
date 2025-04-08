function resolveAfter4Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("success");
        }, 4000);
    });
}

//Test 2
console.log("Exercise 2 started - waiting 4 seconds...");
resolveAfter4Seconds().then(result => {
    console.log("Exercise 2 result:", result);
});
