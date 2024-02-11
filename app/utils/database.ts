// app/utils/database.ts

import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://kkcertine:xjSXxhBy88kkOv7V@cluster0.rqmnc68.mongodb.net/nextAppDatabase?retryWrites=true&w=majority");
        console.log("Success: MongoDB Connected");
    } catch (e) {
        console.log("Failure: Unconnected to MongoDB");
        throw new Error();
    }
}

export default connectDB;
