import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { hash, compare } from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/VerifyToken.js";
const { sign } = jwt;
export const commonApp = exp.Router();
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
config();

//Route for register
commonApp.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;
  try {
    let allowedRoles = ["USER", "AUTHOR"];
    //get user from req
    const newUser = req.body;


    //check role
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    //Upload image to cloudinary from memoryStorage
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }


    //add CDN link(secure_url) of image to newUserObj
    newUser.profileImageUrl = cloudinaryResult?.secure_url;

    //run validators manually
    //hash password and replace plain with hashed one
    newUser.password = await hash(newUser.password, 12);

    //create New user document
    const newUserDoc = new UserModel(newUser);

    //save document
    await newUserDoc.save();
    //send res
    res.status(201).json({ message: "User created" });
  } catch (err) {

    //delete image from cloudinary
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});

//Route for Login(USER, AUTHOR and ADMIN)
commonApp.post("/login", async (req, res, next) => {
  try {

    //get user cred obj
    const { email, password } = req.body;
    //find user by email
    const user = await UserModel.findOne({ email: email });
    //if user not found
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    //check if user account is active
    if (!user.isUserActive) {
      return res.status(403).json({ message: "Your account has been disabled. Contact admin." });
    }
    //compare password
    const isMatched = await compare(password, user.password);
    //if passwords not matched
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid password" });
    }
    //create jwt
    const signedToken = sign(
      {
        id: user._id,
        email: email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    //set token to res header as httpOnly cookie
    res.cookie("token", signedToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    //remove password from user document
    let userObj = user.toObject();
    delete userObj.password;

    //send res
    res.status(200).json({ message: "login success", payload: userObj });
  } catch (err) {
    next(err);
  }
});

//Route for Logout
commonApp.get("/logout", (req, res) => {
  //delete token from cookie storage
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //send res
  res.status(200).json({ message: "Logout success" });
});

//Page refresh
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  //add _id field for consistency with login response (JWT stores it as 'id')
  const userData = { ...req.user, _id: req.user.id };
  res.status(200).json({
    message: "authenticated",
    payload: userData,
  });
});


// change password
commonApp.put("/password",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
    // get current password and new password from req body
    const {currentPassword,newPassword}=req.body;
    //console.log(currentPassword)
    // check currentpassword and new password are same or not
    if (currentPassword=== newPassword){
        return res.status(400).json({message:"New password and Current password should not be same!"})
    };

    //get user's email from token
    const getMail=req.user?.email;
    //console.log(getMail)
    const getDoc=await UserModel.findOne({email:getMail})
    //console.log(getDoc)
    const isMatched= await compare(currentPassword,getDoc.password);
    //console.log(isMatched)
    if(!isMatched){
        return res.status(200).json({message:"Your current password is wrong"})
    };
    //hash the password and replace plain password with this hashed password
    getDoc.password=await hash(newPassword,12);
    //console.log(getDoc.password)
    //save the doc
    getDoc.save();
    // send res
    res.status(200).json({message:"Password changed successfully!"})
});

// Forgot Password
commonApp.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    // find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }
    // create a simple reset link for demo purposes
    // in a real app, you'd send an email with a signed token
    const frontendUrl = process.env.FRONTEND_URL || req.headers.origin || "http://localhost:5173";
    const resetLink = `${frontendUrl}/reset-password?email=${email}`;
    res.status(200).json({
      message: "Reset link generated successfully",
      resetLink: resetLink,
    });
  } catch (err) {
    next(err);
  }
});

// Reset Password
commonApp.put("/reset-password", async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    // find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // hash new password
    user.password = await hash(newPassword, 12);
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
});
