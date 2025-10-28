import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { delivery_straffValidation } from "../validation/delivery_staff.validation.js";
import { create, getAll, getOne, update, deleted } from "../controller/delivery_straff.controller.js";


const deliRouter = Router()


deliRouter.post("/", authGuard, roleGuard("admin", "manager"), validation(delivery_straffValidation), create)
deliRouter.get("/", authGuard, roleGuard("admin", "manager", "staff"), getAll)
deliRouter.get("/:id", authGuard, roleGuard("admin", "manager", "staff"), getOne)
deliRouter.put("/:id", authGuard, roleGuard("admin", "manager"), validation(delivery_straffValidation), update)
deliRouter.delete("/:id", authGuard, roleGuard("admin"), deleted)

export default deliRouter
