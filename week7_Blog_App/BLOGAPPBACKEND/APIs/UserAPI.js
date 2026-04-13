import exp from "express"
import {ArticleModel} from "../models/ArticleModel.js"
export const userApp=exp.Router()
import {verifyToken} from "../middlewares/verifyToken.js"

// userApp.put("/auth",async(req,res)=>{
//     //get email and password from req body
//     const {email,password}=req.body;
//     const user=await UserModel.findOne({email:email})
//     //if email is not existed
//     if(!user){
//         return res.status(404).json({message:"Invalid email"})
//     }
//     // compare password
//     let result=await compare(password,user.password)
//     // this methdod extracts the hashed password
//     if(!result){
//         return res.status(404).json({message:"Invalid Password"})
//     }
//     // if passwords are matched
//     //create token (jsonwebtoken--jwt--jaat)
//     const signedToken=sign({email:user.email},process.env.SECRET_KEY,{expiresIn:"1h"}) // 100 secs :"10"-->10ms "10d"--> 10 days
//     // send token in res
//     //store token as http only cookie
//     res.cookie("token",signedToken,{
//         httpOnly:true,
//         sameSite:"lax",
//         secure:false
//     })
//     //send response
//     res.status(200).json({message:"Login Successfull"})
// })





// Add comment to an article
userApp.put("/articles",verifyToken("USER"),async(req,res)=>{
    // get body from req
    const {articleId,comment}=req.body;
    // check article
    const  articleDocument= await ArticleModel
                .findOne({_id:articleId,isArticleActive})
                .populate("comments.user");
    //if article not found
    if (!articleDocument){
        return res.status(404).json({message:"Article not found!"})
    };
    // get user id
    const userId=req.user?.id;
    // add comment to comments array of articleDocument
    articleDocument.comments.push({user:userId,comment:comment});
    // save
    await articleDocument.save();
    // res res
    res.status(200).json({message:"Comment added succesfully",payload:articleDocument})

});












