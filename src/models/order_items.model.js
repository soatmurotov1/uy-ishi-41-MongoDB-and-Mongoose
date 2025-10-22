import mongoose, { model } from "mongoose";

const order_itemSchema = new mongoose.Schema(
  {
    order_id: { type: Number, required: true },
    product_id: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);

const order_itemModel = model("order_item", order_itemSchema);

export default order_itemModel;
