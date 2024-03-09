import mongoose from "mongoose"
import { DBNAME } from "../../constants.js"

const connectDB = async()=>{
     try {
          const connectionInsctance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
          console.log("DB connected Successfully \n","Host id: ",connectionInsctance.connection.host);
     } catch (error) {
          console.log(" Failed to connect DB");
          process.exit(1);
     }
}
export default connectDB;


