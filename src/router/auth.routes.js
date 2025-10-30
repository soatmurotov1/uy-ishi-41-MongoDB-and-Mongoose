import { Router } from "express";
import { registerUser, loginUser, profileUser, refreshAccessToken } from "../controller/auth.controller.js";
import { validation } from "../middleware/validation.js";
import { authGuard } from "../middleware/guard.middleware.js";
import { registerValidate, loginValidate } from "../validation/auth.validation.js";

export const authRouter = Router()

authRouter.post("/register", validation(registerValidate), registerUser);
authRouter.post("/login", validation(loginValidate), loginUser);
authRouter.get("/profile", authGuard, profileUser);
authRouter.post("/refresh", refreshAccessToken);


