// Mongoose Database Schemas and Model definitions for Users and their Shopping Cart Subdocuments

import { Schema, model, Types } from 'mongoose'

// 1. Define the blueprint (schema) for the Cart Item subdocument
const cartSchema = new Schema({
    product: {
        // References a unique ObjectId from another document collection
        type: Types.ObjectId,
        // The targeted referenced collection model name ("product")
        ref: "product"
    },
    count: {
        type: Number,
        default: 1
    }
})

// 2. Define the blueprint (schema) for the User collection
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is non empty"],
        // String length validation limits
        minLength: [4, "min length of Username is 4 Chars"],
        maxLength: [6, "username size exceed 6 chars"],
    },
    password: {
        type: String,
        required: [true, "password required"],
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "Email already existed"] // Unique constraint to avoid double registration
    },
    age: {
        type: Number,
        required: [true, "age should required"],
    },
    // Embed the cartSchema as an array of subdocuments inside the User document
    cart: [cartSchema]
}, {
    // Disable the auto-generated Mongoose "__v" version key document field
    versionKey: false,
    // Enable automated creation and updates of "createdAt" and "updatedAt" datetime fields
    timestamps: true
});

// Compile the schema into a reusable User Model and export it
export const UserModel = model("user", userSchema)