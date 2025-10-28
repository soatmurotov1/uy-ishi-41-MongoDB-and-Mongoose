import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { customerValidation } from "../validation/customer.validation.js";
import { create, getAll, getOne, update, deleted } from "../controller/customers.controller.js";


const customersRouter = Router()


customersRouter.post("/", validation(customerValidation), create)
customersRouter.get("/", authGuard, roleGuard("admin", "manager"), getAll)
customersRouter.get("/:id", authGuard, roleGuard("admin", "manager", "customer"), getOne)
customersRouter.put("/:id", authGuard, roleGuard("admin", "manager", "customer"), validation(customerValidation), update)
customersRouter.delete("/:id", authGuard, roleGuard("admin", "manager"), deleted)

export default customersRouter
