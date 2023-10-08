import mongoose from "mongoose";
import { process } from 'process';

export const connectMongoDB = async () => {

  try {
    const { NEXT_PUBLIC_MONGO_URI } = process.env;

    if (!NEXT_PUBLIC_MONGO_URI) {
      throw new Error("MongoDB URI not found in environment variables.");
    }
    await mongoose.connect(NEXT_PUBLIC_MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
