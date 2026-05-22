function sumOfArrayElem(a) {
    let res = 0;
    // Loop through each element in the array
    for (let i = 0; i < a.length; i++) {
        res = res + a[i];  
    }
    // Return the accumulated sum
    return res;
}

// Define a test array
let arr = [10, 20, 30, 40];

// Invoke the function and store the result
const result = sumOfArrayElem(arr);

// Print the computed sum to the console
console.log(result);
