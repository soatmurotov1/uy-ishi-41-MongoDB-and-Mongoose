import express, { Router } from "express";
import { createAddress, getAllAddress, getOneAddress, updateAddress, deleteAddress } from "../controller/address.controller.js";
import { addressValidation } from "../validation/address.validation.js";
import { validation } from "../middleware/validation.js";
const addressRouter = Router();

addressRouter.post("/",validation(addressValidation), createAddress);
addressRouter.get("/", getAllAddress);
addressRouter.get("/:id", getOneAddress);
addressRouter.put("/:id",validation(addressValidation), updateAddress);
addressRouter.delete("/:id", deleteAddress);

export default addressRouter;
