// Program to find the largest of three numbers using nested if-else statements

// Initialize three numbers to compare
let a = 20;
let b = 30;
let c = 40;

// Compare a with b
if (a > b) {
    // If a is greater than b, check if a is also greater than c
    if (a > c) {
        console.log("A is biggest");
    } else {
        // If a is greater than b but less than or equal to c, then c is the largest
        console.log("C is biggest");
    }
} else {
    // If b is greater than or equal to a, check if b is greater than c
    if (b > c) {
        console.log("B is biggest");
    } else {
        // If b is greater than or equal to a but less than or equal to c, then c is the largest
        console.log("C is biggest");
    }
}