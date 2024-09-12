import mongoose from "mongoose";
let isConnected=false;
const connectDB=async()=>{
    if(isConnected){
        // console.log("already connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        // console.log("connected db");
        isConnected=true;
    }catch(e){
        console.log(e);
    }
}
connectDB();
export default connectDB;