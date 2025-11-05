import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { validation } from "../middleware/validation.js";
import { orderValidation, orderUpdValidation } from "../validation/orders.validation.js";
import { create, getOne, getAll, update, deleted } from "../controller/orders.controller.js";


const router = Router();


router.post("/", authGuard, roleGuard("admin", "customer"), validation(orderValidation),create)
router.get("/",authGuard, roleGuard("admin", "manager"), getAll)
router.get("/:id", authGuard, roleGuard("admin", "manager"), getOne)
router.put("/:id", authGuard, roleGuard("admin"), validation(orderUpdValidation),update);
router.delete("/:id", authGuard, roleGuard("admin"),deleted)

export default router;
