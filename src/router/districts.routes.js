import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { districtsValidation } from "../validation/districts.validation.js";
import { create, getAll, getOne, update, deleted } from "../controller/districts.controller.js";


const districtsRouter = Router()


districtsRouter.post("/", authGuard, roleGuard("admin", "manager"), validation(districtsValidation), create)
districtsRouter.get("/", authGuard, roleGuard("admin", "manager", "staff", "customer", "user"), getAll)
districtsRouter.get("/:id", authGuard, roleGuard("admin", "manager", "staff", "customer", "user"), getOne)
districtsRouter.put("/:id", authGuard, roleGuard("admin", "manager"), validation(districtsValidation), update)
districtsRouter.delete("/:id", authGuard, roleGuard("admin"), deleted);


export default districtsRouter
