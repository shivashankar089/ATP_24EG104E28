import { Schema,model} from "mongoose";

const UserSchema= new Schema(
    {
    firstName:{
        type:String,
        required:[true,"First Name is Mandatory"]
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"]
    },
    role:{
        type:String,
        enum:['USER','AUTHOR','ADMIN'],
        required:[true,"{Value} is a Invalid role"]
    },
    profileImageUrl:{
        type:String
    },
    isUserActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true,
    versionKey:false,
    strict:"throw"
});

// create and export article model
export const UserModel=model("user",UserSchema)