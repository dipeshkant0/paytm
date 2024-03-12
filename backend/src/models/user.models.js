import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import  Jwt  from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

const userSchema = mongoose.Schema({
     username:{
          type: String,
          required:true,
          trim: true,
          unique: true,
          lowercase: true,
          index: true,
     },
     email:{
          type: String,
          required:true,
          trim: true,
          unique: true,
          lowercase: true,
          index: true,
     },
     firstName:{
          type:String,
          required:true,
          trim: true,
     },
     LastName:{
          type: String,
          required: true,
          trim: true,
     },
     password:{
          type: String,
          required : true,
     }
}, { 
     timestamps: true,
 })

userSchema.pre('save', async function(next){
     if (!(this.isModified("password"))) return next();
     const saltRounds = 10;
     const salt = await bcrypt.genSalt(saltRounds);
     this.password = await bcrypt.hash(this.password,salt);
     next();
})

userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccesstoken = async function(){
     try {
         return  Jwt.sign(
                              {
                                   username: this.username,
                                   email: this.email,
                              },
                              process.env.ACCESS_TOKEN_SECRET,
                              {
                                   expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                              }
                         )
     } catch (error) {
          throw new apiError(400, "problem while genetrating Acess token")
     }
} 

export const User = mongoose.model("User",userSchema);