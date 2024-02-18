// src/app/utils/database.ts

import { env } from "@/env.mjs";
import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(env.DATABASE_URL);
        console.log("Success: MongoDB Connected");
    } catch (e) {
        console.log("Failure: Unconnected to MongoDB");
        throw new Error();
    }
}

export default connectDB;
