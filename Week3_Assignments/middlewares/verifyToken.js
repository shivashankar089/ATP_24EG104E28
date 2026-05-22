// JWT Verification Middleware to protect private routes

import jwt from 'jsonwebtoken'
const { verify } = jwt

export function verifyToken(req, res, next) {
    // Extract the token from the client's cookies (using cookie-parser middleware)
    const token = req.cookies?.token;
    
    // If the token is missing, reject the request with a 401 Unauthorized status
    if (!token) {
        return res.status(401).json({ message: "Please log in to continue" })
    }
    
    try {
        // Verify the signature of the token using the secret key "Harish"
        const decodedToken = verify(token, "Harish")
        console.log("Decoded Token Payload:", decodedToken)
        
        // Attach the verified decoded token payload to the request object so subsequent handlers can access it
        req.user = decodedToken
        
        // Forward the request to the next middleware or route handler in the pipeline
        next()
    }
    catch (err) {
        // If verification fails (e.g. token expired, invalid signature), return a 401 Unauthorized status
        res.status(401).json({ message: "Session expired or invalid token. Please log in again." })
    }
}