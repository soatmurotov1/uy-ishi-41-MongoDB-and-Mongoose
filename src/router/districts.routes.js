import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { districtsValidation } from "../validation/districts.validation.js";
import { create, getAll, getOne, update, deleted } from "../controller/districts.controller.js";
import { loginUser } from "../controller/auth.controller.js";
import { refreshAccessToken } from "../controller/auth.controller.js";

const districtsRouter = Router()


districtsRouter.post("/register", roleGuard("admin", "manager"), validation(districtsValidation), create)
districtsRouter.get("/profile", authGuard, roleGuard("customer","admin","manager"), getOne)
districtsRouter.get("/", authGuard, roleGuard("admin", "manager", "staff", "customer", "user"), getAll)
districtsRouter.put("/:id", authGuard, roleGuard("admin", "manager"), validation(districtsValidation), update)
districtsRouter.delete("/:id", authGuard, roleGuard("admin"), deleted);
districtsRouter.post("/login", loginUser)
districtsRouter.post("/refresh", refreshAccessToken)


export default districtsRouter



