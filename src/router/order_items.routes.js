import express, { Router } from "express";
import {
  createOrderItem,
  getAllOrderItem,
  getOneOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "../controller/order_items.controller.js";

const orderItemRouter = Router();

orderItemRouter.post("/", createOrderItem);
orderItemRouter.get("/", getAllOrderItem);
orderItemRouter.get("/:id", getOneOrderItem);
orderItemRouter.put("/:id", updateOrderItem);
orderItemRouter.delete("/:id", deleteOrderItem);

export default orderItemRouter;
