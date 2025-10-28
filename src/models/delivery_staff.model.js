import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { hashPasswordBeforeSave, hashPasswordBeforeUpdate, comparePasswords } from "../middleware/password.middleware.js";

const deliveryStaffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    district_id: { type: Schema.Types.ObjectId, ref: "district", required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["staff", "manager", "admin", "user", "customer"], default: "user" },
  },
  { timestamps: true }
);

deliveryStaffSchema.pre("save", hashPasswordBeforeSave);
deliveryStaffSchema.pre("findByIdAndUpdate", hashPasswordBeforeUpdate);

deliveryStaffSchema.methods.comparePassword = async function (enteredPassword) {
  return comparePasswords(enteredPassword, this.password);
};

const DeliveryStaffModel = model("delivery_staff", deliveryStaffSchema);
export default DeliveryStaffModel;
