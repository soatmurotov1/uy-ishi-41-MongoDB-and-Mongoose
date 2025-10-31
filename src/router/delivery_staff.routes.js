import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { delivery_straffValidation, delivery_staffUpdValidation } from "../validation/delivery_staff.validation.js";
import { create, getAll, getOne, update, deleted } from "../controller/delivery_straff.controller.js";
import { getAllUsers, profileUser, registerUser } from "../controller/auth.controller.js";
import { loginUser } from "../controller/auth.controller.js";
import { refreshAccessToken } from "../controller/auth.controller.js";


const deliRouter = Router()


deliRouter.post("/", roleGuard("admin", "manager"), validation(delivery_straffValidation), create)
deliRouter.get("/profile", authGuard, roleGuard("customer","admin","manager"), getAll);
deliRouter.get("/", authGuard, roleGuard("admin", "manager", "staff"), getAll)
deliRouter.put("/:id", authGuard, roleGuard("admin", "manager"), validation(delivery_staffUpdValidation), update)
deliRouter.delete("/:id", authGuard, roleGuard("admin"), deleted)
deliRouter.post("/login", loginUser) 
deliRouter.post("/refresh", refreshAccessToken)



export default deliRouter
