import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { authGuard, authorizeRoles } from "../middleware/guard.middleware.js";
import { registerUser, loginUser, refreshAccessToken, profileUser, getAllUsers, verifyOtp } from "../controller/auth.controller.js";
import { customerValidation, customerUpdValidation } from "../validation/customer.validation.js";

const router = Router();

router.post("/register", validation(customerValidation), registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);

router.get("/profile", authGuard, authorizeRoles("admin", "manager", "customer"), profileUser);
router.get("/", authGuard, authorizeRoles("admin"), getAllUsers);

export default router;
