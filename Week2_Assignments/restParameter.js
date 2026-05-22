// The rest parameter collects all remaining arguments passed to a function into a standard array.

function sum(...a) {
    // Utilize the array reduce method to accumulate all elements in the arguments array
    let r1 = a.reduce((acc, sumobj) => acc + sumobj, 0);
    return r1;
}

// Call the function with multiple arguments
console.log("Sum of 10, 20, 30:", sum(10, 20, 30)); // 60
console.log("Sum of 5, 10, 15, 20, 25:", sum(5, 10, 15, 20, 25)); // 75