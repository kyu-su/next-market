// app/utils/schemaModels.ts

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: String,
    image: String,
    price: String,
    description: String,
    email: String,
});

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
