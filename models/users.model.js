import mongoose from "mongoose";
//var validator = require('validator');
import validator from 'validator';//
import UserRole from "./userRole.js";
const Schema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },

      lastName:{
        type:String,
        required:true,
    },
        email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
        password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        enum:[UserRole.ADMIN,UserRole.MANAGER,UserRole.USER]
    },
    avatar:{
        type:String,
        default:"uplaods/avatar.png"
    }
})

export default mongoose.model("User",Schema);