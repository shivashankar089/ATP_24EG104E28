// Asynchronous OTP (One-Time Password) countdown timer simulation

console.log("OTP sent successfully");

// Start countdown from 10 seconds (decremented on first execution to show 10)
let i = 11;

// Setup a recurring interval to execute a function every 1000ms (1 second)
let intervalid = setInterval(() => {
    i--;
    console.log(`Time remaining: ${i}s`);
    
    // Once the countdown reaches 0, stop the interval and prompt the user to resend the OTP
    if (i == 0) {
        console.log("OTP Expired. Please click 'resend OTP'");
        // Clear/stop the recurring timer execution
        clearInterval(intervalid);
    }
}, 1000);