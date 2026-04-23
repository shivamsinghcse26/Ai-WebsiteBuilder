import mongoose from "mongoose";
import { use } from "react";
    
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email must be unique"],
        lowercase:[true,"Email should be in lowercase"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"] ,

    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],
        
    },
    avatar:{
        type:String,
        
    },  
    credits:{
        type:Number,
        default:100,
        min:0
    }, 
    plan:{
        type:String,
        enum:["free","pro","enterprise"],
        default:"free"
    }
},{timestamps:true});

export default mongoose.model("User", userSchema);