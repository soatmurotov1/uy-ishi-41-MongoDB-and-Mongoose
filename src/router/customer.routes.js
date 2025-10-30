import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { customerValidation, customerUpdValidation } from "../validation/customer.validation.js";
import { registerUser, profileUser, getAllUsers, updateUser, deleteUser, loginUser, refreshAccessToken } from "../controller/auth.controller.js";

const router = Router();


router.post("/", validation(customerValidation), registerUser);
router.get("/profile", authGuard, roleGuard("customer","admin","manager"), profileUser);
router.get("/", authGuard, roleGuard("admin","manager"), getAllUsers)
router.put("/:id", authGuard, roleGuard("admin"), validation(customerUpdValidation), updateUser);
router.delete("/:id", authGuard, roleGuard("admin"), deleteUser);
router.post("/login", loginUser)
router.post("/refresh", refreshAccessToken);


export default router;
