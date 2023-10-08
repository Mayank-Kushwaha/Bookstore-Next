import mongoose from "mongoose";

const { NEXT_PUBLIC_MONGO_URI } = process.env;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(NEXT_PUBLIC_MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
