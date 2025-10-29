import { config } from "../config/index.js";
import { verifyToken } from "../helper/jwt.js";

export const authGuard = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token mavjud emas yoki xato format" });
    }

    const token = authHeader.split(" ")[1];
    const validToken = verifyToken(token, config.jwt.accessSecret);

    if (!validToken) {
      return res.status(401).json({ message: "Token yaroqsiz yoki muddati tugagan" });
    }

    req.user = validToken
    next();
  } catch (error) {
    console.error("AuthGuard error:", error);
    return res.status(500).json({ message: "Server xatosi auth tekshiruvda" });
  }
};

export const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Token mavjud emas yoki xato" });
    }

    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Sizning ushbu yo'nalishga kirishga ruxsatingiz yo'q" })
    }
    next()
  };
};
