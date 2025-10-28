import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { paymentValidation } from "../validation/payments.validation.js";
import { create, getAll, getOne, update, deleted } from "../controller/payments.controller.js";


const paymentsRouter = Router();


paymentsRouter.post("/", authGuard, roleGuard("customer"), validation(paymentValidation), create)
paymentsRouter.get("/", authGuard, roleGuard("admin", "manager", "customer"), getAll)
paymentsRouter.get("/:id", authGuard, roleGuard("admin", "manager", "customer"), getOne)
paymentsRouter.put("/:id", authGuard, roleGuard("customer"), validation(paymentValidation), update)
paymentsRouter.delete("/:id", authGuard, roleGuard("admin", "manager"), deleted)


export default paymentsRouter

