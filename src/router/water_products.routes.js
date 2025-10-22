import express, { Router } from "express";
import {
  createwater,
  getAllwater,
  getOnewater,
  updatewater,
  deletewater,
} from "../controller/water_products.controller.js";

const waterRouter = Router();

waterRouter.post("/", createwater);
waterRouter.get("/", getAllwater);
waterRouter.get("/:id", getOnewater);
waterRouter.put("/:id", updatewater);
waterRouter.delete("/:id", deletewater);

export default waterRouter;
