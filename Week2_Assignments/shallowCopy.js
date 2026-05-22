// Demonstrating Shallow Copy in JavaScript
const user = {
 id: 101,
 name: "Ravi",
 preferences: {
    theme: "dark",
    language: "en"    
   }
};

// Perform a shallow copy of the 'user' object
let slcopy = { ...user };

// 1. Mutate a top-level property (primitive string) on the copied object
slcopy.name = "Hari"; // This does NOT affect user.name

// 2. Mutate a nested property on the copied object
slcopy.preferences.theme = "light"; // This DOES affect user.preferences.theme because the reference is shared!

// Log original object: name remains "Ravi" but preferences.theme changes to "light"
console.log("Original User Object:", user);

// Log copied object: name is "Hari" and preferences.theme is "light"
console.log("Shallow Copied User Object:", slcopy);