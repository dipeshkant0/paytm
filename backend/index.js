import connectDB from "./src/DB/connectDB.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
     path:'./.env'
})

connectDB()
.then(
     ()=>{
          app.on("error",()=>{
               console.log("App facing error while listning");
               process.exit(1);
          })
          app.listen(process.env.PORT||8000,()=>{
               console.log(`App listening at `,process.env.PORT||8000);
          })
     }
     
)
.catch(
     (err)=>{
          console.log("Facing problem while connecting to database");
     }
)
