import exp from 'express'
import {config} from 'dotenv'
import {connect} from 'mongoose'
import {userApp} from './APIs/UserAPI.js'
import {authorApp} from './APIs/AuthorAPI.js'
import {adminApp} from './APIs/AdminAPI.js'
import {commonApp} from './APIs/CommonAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


config();
const app=exp()

app.use(cors(
    {
        origin:["http://localhost:5173"],
        credentials:true, // this enables to send the token back to the frontend
    }
))



// body parser middleware
 app.use(exp.json())
// cookie parser middleware
app.use(cookieParser())
 //path level middlewares
 app.use("/user-api",userApp)
 app.use("/author-api",authorApp)
 app.use("/admin-api",adminApp)
 app.use("/auth",commonApp)

//CONNECTION TO DATABASE
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("Data base connection successfull")
    //Assign port
    const port=process.env.PORT || 4000
    app.listen(port,()=>console.log(`server listening on ${port}`))
    }catch(err){
        console.log("Error in connecting DB:",err)
    }
};
connectDB()



// to handle invalid path
// to check whether the error response is html or json
//we need json response not html response
app.use((req,res,next)=>{
    console.log(req.url)
    res.status(404).json({message:`Path ${req.url} is invalid`})
})



//Error handling middleware
app.use((err,req,res,next)=>{
    console.log(err.name)
    if (err.name==="ValidationError"){
    return res.status(400).json({message:"Error Occurred",error:err.message})
    }
    //Cast Error
    if (err.name==="CastError"){
    return res.status(400).json({message:"Error Occurred",error:err.message})
    }
    // Server Side Error
    res.status(500).json({message:"error occurred",error:"Server side error"})
});