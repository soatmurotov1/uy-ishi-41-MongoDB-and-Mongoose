import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { create, getOne, getAll, update, deleted } from "../controller/orders.controller.js";


const router = Router();

router.post("/", roleGuard("customer"), create);
router.get("/", authGuard, roleGuard("customer","admin","manager"), getAll);
router.get("/:id", authGuard, roleGuard("customer","admin","manager"), getOne);
router.put("/:id", authGuard, roleGuard("admin"), update);
router.delete("/:id", authGuard, roleGuard("admin"), deleted);

export default router;
