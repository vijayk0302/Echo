import mongoose from "mongoose";
const connectdb = async () => {
  const url = process.env.MONGO_URL;
  if(!url){
    console.log("env url not found")
    return
  }
  try {
    const response = await mongoose.connect(url);
    console.log("connected to database")
  } catch (error) {
    console.log("something went wrong :",error)
  }
};

export default connectdb;
