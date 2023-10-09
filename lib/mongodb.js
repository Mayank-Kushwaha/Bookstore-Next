import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config()

export const connectMongoDB = async () => {
  
  const MONGO_URI = process.env.MONGO_URI;
  try {
    console.log(`${MONGO_URI}`);
    await mongoose.connect(`${MONGO_URI}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
