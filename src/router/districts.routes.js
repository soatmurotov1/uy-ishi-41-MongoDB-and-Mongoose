import express, { Router } from "express"
import { createDistricts, getAllDistricts, getOneDistricts, updateDistricts, deleteDistricts } from "../controller/districts.controller.js"



const districtsRouter = Router()


districtsRouter.post("/", createDistricts)
districtsRouter.get("/", getAllDistricts)
districtsRouter.get("/:id", getOneDistricts)
districtsRouter.put("/:id", updateDistricts)
districtsRouter.delete("/:id", deleteDistricts)

export default districtsRouter