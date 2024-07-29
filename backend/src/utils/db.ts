// src/db.ts
import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/task"

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
