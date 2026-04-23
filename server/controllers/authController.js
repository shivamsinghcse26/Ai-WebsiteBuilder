import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

export const googleAuth=async(req,res)=>{
    try{
        const {email,name,avatar}=req.body;
        let user=await user.findOne({email});
        if(!user){
            user=await User.create({
                name:name,
                email:email,
                avatar:avatar
            });
        }
        const accessToken=await jwt.sign({id:user._id},process.encv.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.cookie("token",accessToken,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000,
        });
        return res.status(200).json(user);
        
       
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message});
    }

}

export const logoutUser=async(req,res)=>{
    try{
    res.clearCookie("token",{
        httpOnly:true,
        secure:true,
        sameSite:"none",
    });
    res.status(200).json({message:"Logged out successfully"});
}   
catch(error){
    res.status(500).json({message:"Server error",error:error.message});
}   
}