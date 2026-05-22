// Express Server with MongoDB Mongoose Integration, Environment Configuration, Routing, and Centralized Error Handling

import exp from 'express'
import { connect } from 'mongoose'
import { userApp } from './APIs/UserAPI.js'
import { UserModel } from './models/UserModel.js'
import { productApp } from './APIs/ProductAPI.js'
import { ProductModel } from './models/ProductModel.js'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'

// Initialize dotenv configuration to load environment variables from the .env file into process.env
config();

const app = exp()

// Middleware to parse incoming request body as JSON
app.use(exp.json())

// Middleware to parse incoming cookies from headers
app.use(cookieParser())

// Routing: Register User API and Product API routers under specific routes
app.use("/user-api", userApp)
app.use("/product-api", productApp)

// Determine the server port using process.env or fallback to 4000
const port = process.env.port || 4000

// Asynchronous function to connect to the MongoDB database and start the HTTP server
async function connectDB() {
    try {
        // Connect to MongoDB using the DB_URL variable defined in .env
        await connect(process.env.DB_URL)
        console.log("DB connection success")
        
        // Start the Express server once the database connection is successfully established
        app.listen(port, () => console.log(`Server running on port ${port}...`))
    }
    catch (err) {
        console.log("Error in DB connection:", err)
    }
}

// Execute the DB connection function
connectDB();

// Centralized Express Error Handling Middleware
app.use((err, req, res, next) => {
    // 1. Handle Mongoose Validation Errors (e.g. required field missing or bad format)
    if (err.name == "ValidationError") {
        return res.status(400).json({ message: "error occurred", error: err.message })
    }

    // 2. Handle Mongoose Cast Errors (e.g. invalid MongoDB ObjectId passed in URL params)
    if (err.name == "CastError") {
        return res.status(400).json({ message: "Error Occurred", error: err.message })
    }

    // 3. Fallback: Send a generic internal server error (HTTP 500)
    res.status(500).json({ message: "error occurred", error: "Server side Error" })
})