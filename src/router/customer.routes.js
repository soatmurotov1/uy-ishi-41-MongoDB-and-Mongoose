import { Router } from "express"
import { validation } from "../middleware/validation.js"
import { authGuard, roleGuard } from "../middleware/guard.middleware.js"
import { register, login, refreshAccessToken, profile, getAll, verifyOtp, deleted } from "../controller/customers.controller.js"
import {customerValidation } from "../validation/customer.validation.js";

const customerRouter = Router();


customerRouter.post("/register", validation(customerValidation), register)
customerRouter.post("/verify", verifyOtp)
customerRouter.post("/login", login)
customerRouter.post("/refresh", refreshAccessToken)
customerRouter.get("/profile",authGuard, roleGuard("customer", "manager", "admin"), profile)
customerRouter.get("/", authGuard, roleGuard("admin", "manager"), getAll)
customerRouter.delete("/:id", authGuard, roleGuard("admin", "manager"), deleted)

export default customerRouter 

