import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyToken = asyncHandler(async(req, res,next)=>{
     try {
          const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ','');
          if(!token){
               throw new apiError(400, "Token not Found");
          }
     
          const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
     
          if(!decodedToken){
               throw new apiError(400 ,"Token verification failed")
          }
          const user = await User.findById(decodedToken?._id).select("-password");
          
          if(!user){
               throw new apiError(400, "Invalid Token");
          }
     
          req.user = user;
          
          next();
     } catch (error) {
          error=>{
               console.log(error);
          }
     }
     
})