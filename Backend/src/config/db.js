import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

const connectdb = async () => {
  const url = ENV.MONGO_URL;
  if(!url){
    console.log("env url not found")
    return
  }
  try {
    const response = await mongoose.connect(url);
    console.log("connected to database :",response.connection.host)
  } catch (error) {
    console.log("something went wrong :",error)
    process.exit(1)
  }
};

export default connectdb;
