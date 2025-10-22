import express, { Router } from "express"
import { createPayments, getAllPayments, getOnePayments, updatePayments, deletePayments } from "../controller/payments.controller.js"


const paymentsRouter = Router()

paymentsRouter.post("/", createPayments)
paymentsRouter.get("/", getAllPayments)
paymentsRouter.get("/:id", getOnePayments)
paymentsRouter.put("/:id", updatePayments)
paymentsRouter.delete("/:id", deletePayments)

export default paymentsRouter