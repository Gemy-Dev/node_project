import mongoose from "mongoose";

const corsesSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    }
})

export default mongoose.model("Corse", corsesSchema)