// Demonstrating Javascript Asynchronous Execution using setTimeout()

console.log("Exam submitted successfully");

// Schedule answer evaluation after a 2-second (2000ms) delay
setTimeout(() => {
    console.log("evaluating answer...");
}, 2000);

// Schedule printing the result after a 4-second (4000ms) delay
setTimeout(() => {
    console.log("Result: Pass");
}, 4000);