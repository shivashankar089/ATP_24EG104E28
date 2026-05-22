// Demonstrating Object Cloning and Extension using the ES6 Spread Operator (...)

let user = {
    name: "Ravi",
    city: "Hyderabad"
};

// Create a new object 'updateUser' by copying properties from 'user' and adding a new property 'age'
let updateUser = { ...user, age: 25 };

// Log original object to show it remains unaffected
console.log("Original User Object:", user);

// Log the updated/extended user object
console.log("Updated User Object:", updateUser);