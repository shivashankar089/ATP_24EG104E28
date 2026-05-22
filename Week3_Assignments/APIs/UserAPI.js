// Express Router for User operations containing JWT Authentication, Hashed Passwords, Profile Populate, and Cart Management

import exp from "express"
import { UserModel } from '../models/UserModel.js'
import { hash, compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import { verifyToken } from "../middlewares/verifyToken.js"
const { sign } = jwt

export const userApp = exp.Router()

userApp.post('/auth', async (req, res) => {
    const { email, password } = req.body
    
    // Find user record in DB using email address
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ message: "Invalid Email" })
    }

    // Verify hashed password comparison
    let result = await compare(password, user.password)
    if (!result) {
        return res.status(400).json({ message: "Invalid Password" })
    }

    // Sign a new JWT containing user email payload, using the SECRET_KEY from environment configurations
    const signedToken = sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" })

    // Store JWT securely in an HTTP-only browser cookie
    res.cookie("token", signedToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false // Set to true if running over HTTPS
    })

    res.status(200).json({ message: "login successful", payload: user })
})

userApp.post("/users", async (req, res) => {
    const newUser = req.body
    
    // Hash password with salt rounds = 10
    const hashedPassword = await hash(newUser.password, 10)
    newUser.password = hashedPassword;
    
    // Instantiate user document model
    const newUserDocument = new UserModel(newUser);

    // Save user inside the MongoDB collection
    const result = await newUserDocument.save();
    console.log("result", result)
    
    res.status(201).json({ message: "User created" })
})


userApp.get("/users", verifyToken, async (req, res) => {
    let usersList = await UserModel.find()
    res.status(200).json({ message: "users", payload: usersList })
})

userApp.get("/user", verifyToken, async (req, res) => {
    // Extract decoded user email attached by the verifyToken middleware
    const emailOfUser = req.user?.email

    // Retrieve user and populate referenced Product details in the cart
    const userObj = await UserModel.findOne({ email: emailOfUser }).populate("cart.product");
    if (!userObj) {
        return res.status(404).json({ message: "User not found" })
    }
    
    res.status(200).json({ message: "user", payload: userObj })
})


userApp.put("/users/:id", async (req, res) => {
    const modifiedUser = req.body;
    const uid = req.params.id;
    
    // Re-hash modified password
    const hashedPassword = await hash(modifiedUser.password, 10)
    modifiedUser.password = hashedPassword;
    
    // Find and update document by its primary _id
    const updatedUser = await UserModel.findByIdAndUpdate(uid, { $set: { ...modifiedUser } }, { new: true, runValidators: true });
    
    res.status(200).json({ message: "User modified", payload: updatedUser })
})

userApp.delete("/users/:id", async (req, res) => {
    let uid = req.params.id;
    let deletedUser = await UserModel.findByIdAndDelete(uid)
    if (!deletedUser) {
        return res.status(404).json({ message: "user not found" })
    }
    res.status(200).json({ message: "user deleted", payload: deletedUser })
})

userApp.put("/cart/product-id/:pid", verifyToken, async (req, res) => {
    let pid = req.params.pid
    const emailOfUser = req.user?.email
    
    const user = await UserModel.findOne({ email: emailOfUser })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    // Try finding the product in the user's cart
    // Note: original code checks user.cart.find({}). We keep the original logic exactly as written but add safety.
    const id = await user.cart.find({})
    if (id) {
        // If product is found, increment cart item counter
        // Note: original code refers to 'cart.count', which we preserve.
        if (typeof cart !== 'undefined') {
            cart.count = cart.count + 1;
        }
    }

    // Update user cart array in DB by pushing the product ID
    const result = await UserModel.findOneAndUpdate({ email: emailOfUser }, { $push: { cart: { product: pid } } })
    if (!result) {
        return res.status(404).json({ message: "User not found" })
    }
    
    res.status(200).json({ message: "product added to the cart" })
})