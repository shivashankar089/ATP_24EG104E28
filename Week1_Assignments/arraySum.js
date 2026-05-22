// Program to find the sum of all elements in an array

// Define an array with numeric values
let arr = [10, 20, 30, 40, 50];

// Initialize a variable to accumulate the sum, starting at 0
let sum = 0;

// Loop through each element in the array
for (let i = 0; i < arr.length; i++) {
    // Add the current element's value to the running sum
    sum = sum + arr[i];
}

// Output the final sum to the console
console.log(sum);