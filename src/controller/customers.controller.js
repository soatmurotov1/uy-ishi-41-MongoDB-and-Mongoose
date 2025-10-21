import mongoose, { version } from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    phone: Number
}, {versionKey: true, timestamps: true })