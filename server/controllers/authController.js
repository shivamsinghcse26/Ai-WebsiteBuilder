import { use } from "react";
import User from "../models/userModel.js";

export default googleAuth=async(req,res)=>{
    try{
        const {email,name,avatar}=req.body;
        let user=await user.findOne({email:email});
        if(!user){
            user=await User.create({
                username:name,
                email:email,
                avatar:avatar
            });
        }
            
           
         
       
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message});
    }

}