import exp from "express"
import {UserModel} from "../models/UserModel.js"
import {hash,compare} from "bcryptjs"
import jwt from "jsonwebtoken"
const {sign}=jwt
import { config} from "dotenv"
import { verifyToken } from "../middlewares/verifyToken.js"
export const commonApp=exp.Router()
import {upload} from '../config/multer.js'
import { uploadToCloudinary } from "../config/cloudinaryUpload.js"
import cloudinary from "../config/cloudinary.js"
config();



//Route for register
commonApp.post("/users",upload.single("profileImageUrl"),async(req,res)=>{
    let allowedUsers=["USER","AUTHOR"]
    //get user from user 
    const newUser=req.body
    //check roles
    if (!allowedUsers.includes(newUser.role)){
       return res.status(400).json({messgae:"Invalid role entered!"})
    }


    let cloudinaryResult;
    // upload image from cloudinary from memoryStorage
    if(req.file){
       cloudinaryResult= await uploadToCloudinary(req.file.buffer)
    }
    // add CDN link of image to newUserObj
    newUser.profileImageUrl=cloudinary?.secure_url;;

    //hash the password and replace plain password with this hashed password
    newUser.password=await hash(newUser.password,12)
    //Create a newUser document
    const newUserDocument= new UserModel(newUser)

    //save the document
    await newUserDocument.save()
    //send response
    res.status(201).json({message:"User created"})
});



//Route for login
commonApp.post("/login",async(req,res)=>{
    //get user credentils object
    const {email,password}=req.body
    // find user by email
    const user=await UserModel.findOne({email:email})
        //if email is not existed
        if(!user){
            return res.status(400).json({message:"Invalid email"})
        }
        // compare password
        let isMatched=await compare(password,user.password)
        // this methdod extracts the hashed password
        if(!isMatched){
            return res.status(400).json({message:"Invalid Password"})
        }
        // if passwords are matched
        //create token (jsonwebtoken--jwt--jaat)
        const signedToken=sign(
            {id:user._id,
            email:email,
            role:user.role,
            firstName:user.firstName,
            profileImageUrl:user.profileImageUrl,
            lastName:user.lastName
           },
            process.env.SECRET_KEY,
            {
                expiresIn:"1h"
            }) // 100 secs :"10"-->10ms "10d"--> 10 days
        // send token in res
        //store token as http only cookie
        res.cookie("token",signedToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        });
        /// remove password from showing on like dashboards
        // Converting mongodb document to JavaScrpit object
        let userObj=user.toObject(); 
        delete userObj.password;
        //send response
        res.status(200).json({message:"Login Successfull",payload:userObj})
})
    


//Route for logout
commonApp.get("/logout",(req,res)=>{
    // delete token from cookie stirage
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });
    // send res
    res.status(200).json({message:"Logout successful"})
});

//page refresh
commonApp.get("/check-auth",verifyToken("USER","AUTHOR","ADMIN"),(req,res)=>{
    res.status(200).json({
        message:"authenticated",
        payload:req.user,
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
    const getMail=req.user?.email;
    //console.log(getMail)
    const getDoc=await UserModel.findOne({email:getMail})
    //console.log(getDoc)
    const isMatched= await compare(currentPassword,getDoc.password);
    console.log(isMatched)
    if(!isMatched){
        return res.status(200).json({message:"Your current password is wrong"})
    };
    //hash the password and replace plain password with this hashed password
    getDoc.password=await hash(newPassword,12);
    console.log(getDoc.password)
    //save the doc
    getDoc.save();
    // send res
    res.status(200).json({message:"Password changed successfully!"})
});