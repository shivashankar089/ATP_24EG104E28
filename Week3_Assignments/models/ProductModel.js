// Mongoose Database Schema and Model definition for Products

import { Schema, model } from "mongoose";

// Define the blueprint (schema) for the Product collection in MongoDB
const productSchema = new Schema({
    productID: {
        type: String,
        required: [true, "product ID is required"],
        unique: [true, "product id already exists"] // Ensures no duplicate product IDs are saved
    },
    productName: {
        type: String,
        required: [true, "product name is required"],
    },
    price: {
        type: Number,
        required: [true, "price should be there"],
        // Numeric range validation constraints
        min: [10000, "minimum price is 10000"],
        max: [50000, "Max price is 50000"]
    },
    brand: {
        type: String,
        required: [true, "brand is mandatory"]
    }
}, {
    // Disable the auto-generated Mongoose "__v" version key document field
    versionKey: false,
    // Enable automated creation and updates of "createdAt" and "updatedAt" datetime fields
    timestamps: true
})

// Compile the schema into a reusable Product Model and export it
export const ProductModel = model("product", productSchema)