import { verifyToken } from "../helper/jwt.js";
import { config } from "../config/index.js";
import customerModel from "../models/customers.model.js";


export const authGuard = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ success: false, message: "token not found" });

    const token = header.split(" ")[1];
    const decoded = verifyToken(token, config.jwt.accessSecret);
    if (!decoded)
      return res.status(401).json({ success: false, message: "Token yaroqsiz yoki muddati tugagan" });

    const user = await customerModel.findById(decoded.id).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "user not found" });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Sizda bu amalni bajarishga ruxsat yo'q",
      });
    }
    next();
  };
};
