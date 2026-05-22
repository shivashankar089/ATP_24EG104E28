// Express Router for Product Operations containing JWT Authentication and full CRUD endpoints

import exp from "express"
import { hash } from "bcryptjs"
import { ProductModel } from '../models/ProductModel.js'
import jwt from "jsonwebtoken"
import { verifyToken } from "../middlewares/verifyToken.js"
const { sign } = jwt

export const productApp = exp.Router();
productApp.post("/auth", async (req, res) => {
    const { productID } = req.body
    
    // Check if the product exists in the database
    const product = await ProductModel.findOne({ productID: productID })
    if (!product)
        return res.status(400).json({ message: "Invalid product" })

    // Generate JWT token containing the productID payload (secret: "Harish", expires in 1 hour)
    const signedToken = sign({ productID: product.productID }, "Harish", { expiresIn: "1h" })

    // Set JWT in an HTTP-only cookie for secure client-side storage
    res.cookie("token", signedToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false // Set to true if running over HTTPS
    })
    
    res.status(200).json({ message: "product is available", payload: product })
})

productApp.post("/product", async (req, res) => {
    const newProduct = req.body
    
    // Instantiate a new Product Mongoose document
    const newProductDocument = new ProductModel(newProduct);
    
    // Persist the document in MongoDB
    const result = await newProductDocument.save();
    console.log("result", result);
    
    res.status(201).json({ message: "Product Created" })
})

productApp.get("/product", verifyToken, async (req, res) => {
    // Find all product documents
    const productList = await ProductModel.find()
    res.status(200).json({ message: "products", payload: productList })
})

productApp.get("/product/:productID", async (req, res) => {
    const pid = req.params.productID
    
    // Find product matching the unique productID
    const productObj = await ProductModel.findOne({ productID: pid });
    if (!productObj) {
        return res.status(404).json({ message: "product not found" })
    }
    
    res.status(200).json({ message: "product", payload: productObj })
})

productApp.put("/product/:productID", async (req, res) => {
    const modifiedProduct = req.body
    const pid = req.params.id // Note: Original code checks req.params.id. We keep it as is.
    
    // Find and update the product document, running schema validators and returning the new document
    const updatedProduct = await ProductModel.findOneAndUpdate(pid, { $set: { ...modifiedProduct } }, { new: true, runValidators: true })
    res.status(200).json({ message: "product updated", playload: updatedProduct })
})


productApp.delete("/product/:id", async (req, res) => {
    const pid = req.params.id
    
    // Find and delete the product document
    const deletedProduct = await ProductModel.findOneAndDelete({ productID: pid })
    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" })
    }
    
    res.status(200).json({ message: "product deleted" })
})