// Demonstrating Array Cloning and Aggregation using the ES6 Spread Operator (...)

let fruits = ["apple", "banana"];

// Create a new array 'morefruits' by spreading elements from 'fruits' and appending "orange"
let morefruits = [...fruits, "orange"];

// Log the original fruits array to show it remains unchanged
console.log("Original Fruits Array:", fruits);

// Log the new morefruits array
console.log("New Expanded Fruits Array:", morefruits);
