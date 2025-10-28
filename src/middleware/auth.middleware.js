import { verifyToken } from "../helper/jwt.js";
import { config } from "../config/index.js";
import customerModel from "../models/customers.model.js";


export const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Token topilmadi" });

    const token = header.split(" ")[1];
    const decoded = verifyToken(token, config.jwt.accessSecret);
    if (!decoded)
      return res.status(401).json({ message: "Token yaroqsiz yoki muddati tugagan" });

    const user = await customerModel.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Sizda ruxsat yo‘q" });
    next();
  };
};
