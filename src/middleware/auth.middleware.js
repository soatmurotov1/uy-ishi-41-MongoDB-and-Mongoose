import { verifyToken } from "../helper/jwt.js";
import { config } from "../config/index.js";


export const authGuard = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !header.startsWith("Bearer ")){
      return res.status(401).json({ message: "Token topilmadi" });
    }

    const token = authHeader.split(" ")[1]
    const verified = verifyToken(token, config.jwt.accessSecret)
    req.user = verified
    next()

  } catch (error) {
    next(error)
  }
}

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Sizda ruxsat yo'q" });
    next();
  };
};
