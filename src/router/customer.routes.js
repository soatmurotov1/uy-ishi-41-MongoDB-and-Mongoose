import express, { Router } from "express"
import { createCustomers, getAllCustomers, getOneCustomers, updateCustomers, deleteCustomer } from "../controller/customers.controller.js"


const customersRouter = Router()

customersRouter.post("/", createCustomers)
customersRouter.get("/", getAllCustomers)
customersRouter.get("/:id", getOneCustomers)
customersRouter.put("/:id", updateCustomers)
customersRouter.delete("/:id", deleteCustomer)

export default customersRouter