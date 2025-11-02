import { config } from "../config/index.js";
import jwt from "jsonwebtoken";
import delivery_staffModel from "../models/delivery_staff.model.js"


const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.accessSecret,
    { expiresIn: "15m" } 
  )

  const refreshToken = jwt.sign(
    { id: user._id },
    config.jwt.refreshSecret,
    { expiresIn: "5m" } 
  );

  return { accessToken, refreshToken }
}

export const registerDeliveryStaff = async (req, res, next) => {
  try {
    const { name, phone, vehicle_number, district_id, email, password, role } = req.body
    const existingUser = await delivery_staffModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Bunday email avval ro'yxatdan o'tgan" })
    }
    const user = await delivery_staffModel.create({
      name,
      phone,
      vehicle_number,
      district_id,
      email,
      password,
      role: role || "staff",
    })

    const tokens = generateTokens(user)

    res.status(201).json({
      message: "Xodim muvaffaqiyatli ro'yxatdan o'tdi",
      data: user,
      ...tokens,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const loginDeliveryStaff = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await delivery_staffModel.findOne({ email }).select("password role name email")
    console.log("👉 enteredPassword:", password)
    console.log("👉 user password from DB:", user?.password);

    if (!user) {
      return res.status(404).json({ message: "Bunday foydalanuvchi topilmadi" })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Parol noto'g'ri" });
    }
    const tokens = generateTokens(user)
    res.status(200).json({
      message: "Tizimga kirish muvaffaqiyatli",
      data: user,
      ...tokens,
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const refreshAccessTokenDeli = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(401).json({ message: "refreshToken talab qilinadi" })
    }

    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret)

    const user = await delivery_staffModel.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" })
    }

    const tokens = generateTokens(user)

    res.status(200).json({
      message: "Access token yangilandi",
      ...tokens,
    })
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "refreshToken yaroqsiz yoki muddati tugagan" })
  }
}

