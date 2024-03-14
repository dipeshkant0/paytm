import { User } from "../models/user.models.js"
import { Account } from "../models/account.models.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"

//Random Account balance at starting

const randomBalance = asyncHandler(async(userId)=>{
     
     const accountBalance = await Account.create({
          accountId: userId,
          balance: 1+ Math.random()*10000,
     })
     
})

// show balance

const showBalance = asyncHandler( async(req, res)=>{
     const userId = req.user?._id;
     console.log(userId);
     if(!userId){
          throw new apiError(400, "Invalid user")
     }

     const accountDeatails = await Account.findOne({accountId:userId});

     if(!accountDeatails){
          throw new apiError(400,"Account not found")
     }


     return res.status(200)
     .json(
          new apiResponse(
               200,
               {Balance: accountDeatails.balance},
               "Account fetch successfully",
          )
     )
})

//transfer

const transfer = asyncHandler (async(req,res)=>{
     
})

export {
     randomBalance,
     showBalance,
}