// Creating an HTTP server using Express framework in Node.js

import exp from 'express';
const app = exp(); // App object represents the Express application and HTTP server

import { userApp } from './APIs/userAPI.js';
import { productApp } from './APIs/productAPI.js';

// Inbuilt middleware to parse incoming HTTP request bodies containing JSON data (JSON body parser)
app.use(exp.json());

// Custom Middleware 1: Logs a message. 
// Note: In the original, next() is commented out, which would cause the request pipeline to halt here if active.
function middleware1(req, res, next) {
    console.log("middleware1 is executed");
    // next(); // Forwards request to the next middleware in the pipeline
}

// Custom Middleware 2: Sends a response directly.
// Note: If this executes, it returns a JSON response and calls next().
function middleware2(req, res, next) {
    res.json({ message: "this is from middleware2" });
    console.log("middleware2 is executed");
    next();
}

// Registering global middleware for all incoming requests
app.use(middleware1);
app.use(middleware2);

// Route-level routing: Forward any request starting with /user-api to the userApp router
app.use("/user-api", userApp);

// Route-level routing: Forward any request starting with /product-api to the productApp router
app.use("/product-api", productApp);

// Port definition
const port = 3000;

// Start the HTTP server on the designated port and log a startup confirmation message
app.listen(port, () => console.log(`Server listening on port ${port}...`));