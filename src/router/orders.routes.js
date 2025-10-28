import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { orderValidation } from "../validation/orders.validation.js";
import { create, getAll, getOne, update, deleted } from "../controller/orders.controller.js";


const orderRouter = Router();


orderRouter.post("/", authGuard, roleGuard("customer"), validation(orderValidation), create)
orderRouter.get("/", authGuard, roleGuard("staff", "manager", "admin", "customer"), getAll)
orderRouter.get("/:id", authGuard, roleGuard("staff", "manager", "admin", "customer"), getOne)
orderRouter.put("/:id", authGuard, roleGuard("customer"), validation(orderValidation), update)
orderRouter.delete("/:id", authGuard, roleGuard("customer"), deleted)


export default orderRouter