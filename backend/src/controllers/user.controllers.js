import { User } from "../models/user.models.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { randomBalance } from "./account.controllers.js"


//Registration of new User
const registerUser = asyncHandler( async(req,res)=>{
     const { username,email, firstName, LastName , password } = req.body

     if(
          [username, email, firstName, LastName, password]
          .some(
                (field)=> field?.trim() === "" || field?.trim() == undefined)
     ){
          throw new apiError(400, "All field required")
     }

     const existedUser = await User.findOne({
          $or:[
               {username},
               {email}
          ]
     })
     if(existedUser){
          throw new apiError(401, "User already Existed")
     }


     const user = await User.create({
          username: username.toLowerCase() ,
          email: email.toLowerCase(),
          firstName:firstName,
          LastName: LastName,
          password
     })

     if(!user){
          throw new apiError(400, "user registration failed")
     }
     
     randomBalance(user._id)
     
     const createdUser = await User.findById(user._id).select("-password")

     return res.status(200)
     .json(
          new apiResponse(
               200,
               createdUser,
               "User registration successfully"
               )
     )

})

// SignIn of existing User
const signIn = asyncHandler( async(req, res)=>{
     const { username, email, password} = req.body

     if(!username && !email){
          throw new apiError(400, "Either username or email Id required");
     }

     if(!password){
          throw new apiError(401, "Password required");
     }

     const user = await User.findOne({
          $or:[
               {username},
               {email}
          ]
     })

     const verifiedPassword= await user.isPasswordCorrect(password);

     if(!verifiedPassword){
          throw new apiError(401,"Invalid credential")
     }

     const accessToken = await user.generateAccesstoken();

     if(!accessToken){
          throw new apiError(400, "failed to generate Token")
     }
     
     const logginUserDetails = await User.findById(user?._id).select("-password");

     const option= {
          httpOnly: true,
          secure:true,
     }
     return res.status(200)
     .cookie("accessToken",accessToken,option)
     .json(
          new apiResponse(
               200,
               logginUserDetails,
               "SignIn successfully"
          )
     )  
})

//logout

const logout = asyncHandler(async(req,res)=>{
     const userId = req.user?._id;
     if(!userId){
          throw new apiError(400, "User already logout");
     }

     const option ={
          httpOnly:true,
          secure: true,
     }

     return res.status(200)
     .clearCookie("accessToken",option)
     .json(
          new apiResponse(
               200,
               {},
               "Logout successfully"
          )
     )
})


export {
     registerUser,
     signIn,
     logout,
}