import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { productValidation, productUpdValidation } from "../validation/water_products.validation.js";
import { create, getAll, getOne, update, deleted } from "../controller/water_products.controller.js";


const waterRouter = Router();


waterRouter.post("/", authGuard, roleGuard("admin", "manager"), validation(productValidation), create)
waterRouter.get("/", authGuard, roleGuard("admin", "manager", "staff", "customer"), getAll)
waterRouter.get("/:id", authGuard, roleGuard("admin", "manager", "staff", "customer"), getOne)
waterRouter.put("/:id", authGuard, roleGuard("admin", "manager"), validation(productUpdValidation), update)
waterRouter.delete("/:id", authGuard, roleGuard("admin", "manager"), deleted)


export default waterRouter
