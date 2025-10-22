import express, { Router } from "express";
import {
  createAddress,
  getAllAddress,
  getOneAddress,
  updateAddress,
  deleteAddress,
} from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post("/", createAddress);
addressRouter.get("/", getAllAddress);
addressRouter.get("/:id", getOneAddress);
addressRouter.put("/:id", updateAddress);
addressRouter.delete("/:id", deleteAddress);

export default addressRouter;
