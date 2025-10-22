import express, { Router } from "express";
import addressRouter from "./address.routes.js";
import customersRouter from "./customer.routes.js";
import deliRouter from "./delivery_staff.routes.js";
import districtsRouter from "./districts.routes.js";
import orderItemRouter from "./order_items.routes.js";
import orderRouter from "./orders.routes.js";
import paymentsRouter from "./payments.routes.js";
import waterRouter from "./water_products.routes.js";

const router = Router();
router.use("/address", addressRouter);
router.use("/customers", customersRouter);
router.use("/delivery_staff", deliRouter);
router.use("/districts", districtsRouter);
router.use("/order_item", orderItemRouter);
router.use("/orders", orderRouter);
router.use("/payments", paymentsRouter);
router.use("/water_products", waterRouter);

export default router;
