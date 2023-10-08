import mongoose from "mongoose";
import {process} from "process";
import dotenv from "dotenv";
dotenv.config()

export const connectMongoDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
