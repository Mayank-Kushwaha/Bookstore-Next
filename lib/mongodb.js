import mongoose from "mongoose";
import { process } from 'process';

export const connectMongoDB = async () => {

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
