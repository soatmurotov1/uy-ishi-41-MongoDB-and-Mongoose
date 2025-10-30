import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { addressValidation, addressValidationUpd } from "../validation/address.validation.js";
import { create, getAll, getOne, update, deleted} from "../controller/address.controller.js";

const addressRouter = Router();


addressRouter.post("/", validation(addressValidation), create );
addressRouter.get("/",authGuard, roleGuard("admin", "manager", "customer", "staff"), getAll )
addressRouter.get("/:id", authGuard, roleGuard("admin", "manager", "customer", "staff"),getOne);
addressRouter.put("/:id", authGuard, roleGuard("customer", "manager"), validation(addressValidationUpd), update)
addressRouter.delete("/:id",authGuard,roleGuard("manager", "admin"),deleted)

export default addressRouter;
