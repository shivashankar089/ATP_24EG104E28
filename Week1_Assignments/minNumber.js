// Program to find the minimum number in a given array

// Define a numeric array
const arr = [90, 78, 65, 92];

// Initialize the minimum value with the first element of the array
let min = arr[0];

// Iterate through the array to compare each element with the current minimum
for (let i = 0; i < arr.length; i++) {
    // If the current element is smaller than the active minimum, update the minimum
    if (arr[i] < min) {
        min = arr[i];
    }
}

// Print the minimum value found
console.log(min);