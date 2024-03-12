import { User } from "../models/user.models.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"


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


export {
     registerUser,
}