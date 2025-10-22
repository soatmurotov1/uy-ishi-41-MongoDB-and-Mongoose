import express, { Router } from "express"
import { createDeli, getAllDeli, getOneDeli, updateDeli, deleteDeli } from "../controller/delivery_straff.controller.js"


const deliRouter = Router()

deliRouter.post("/", createDeli)
deliRouter.get("/", getAllDeli)
deliRouter.get("/:id", getOneDeli)
deliRouter.put("/:id", updateDeli)
deliRouter.delete("/:id", deleteDeli)

export default deliRouter