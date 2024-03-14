import mongoose from "mongoose"

const accountSchema = mongoose.Schema({
     accountId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'User',
          required: true,
     },

     balance :{
          type: Number,
          required: true,
     }

}, { 
     timestamps: true,
 })

 export const Account = mongoose.model("Account",accountSchema);