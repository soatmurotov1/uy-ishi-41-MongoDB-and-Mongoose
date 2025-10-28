import mongoose, { model, Schema } from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    volume_liters: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

const productsModel = model("products", productsSchema);

export default productsModel
