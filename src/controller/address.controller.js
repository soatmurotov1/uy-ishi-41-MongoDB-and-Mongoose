import mongoose, { model } from "mongoose";

const addressSchema = new mongoose.Schema({
    name: String,
    customer_id: Number,
    address: String,
    location: String,
    district_id: Number
}, {versionKey: true, timestamps: true})

const addressModel = model("address", addressSchema)

export default addressModel


