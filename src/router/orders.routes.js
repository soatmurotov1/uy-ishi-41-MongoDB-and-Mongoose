import express, { Router } from "express"
import { createOrder, getAllOrder, getOneOrder, updateOrder, deleteOrder } from "../controller/orders.controller.js"


const orderRouter = Router()


orderRouter.post("/", createOrder)
orderRouter.get("/", getAllOrder)
orderRouter.get("/:id", getOneOrder)
orderRouter.put("/:id", updateOrder)
orderRouter.delete("/:id", deleteOrder)

export default orderRouter