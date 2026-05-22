// Function to find and return the largest of three numbers.
function bigOfThree(a, b, c) {
    // Compare a with b
    if (a > b) {
        // If a is greater than b, check if a is also greater than c
        if (a > c) {
            return "a is biggest";
        } else {
            // Otherwise, c is the largest
            return "c is biggest";
        }
    } else {
        // If b is greater than or equal to a, check if b is greater than c
        if (b > c) {
            return "b is biggest";
        } else {
            // Otherwise, c is the largest
            return "c is biggest";
        }
    }
}

// Call the function with sample values
bigOfThree(10, 20, 30);