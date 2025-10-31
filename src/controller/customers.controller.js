import customersModel from "../models/customers.model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../helper/email.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../helper/jwt.js";
import crypto from "crypto"
import { config } from "../config/index.js";


export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.validatedData

    const existing = await customersModel.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: "Bu email avval ro'yxatdan o'tgan" })
    }
    const otp = crypto.randomInt(100000, 999999).toString()
    const otpExpiresAt = Date.now() + 5 * 60 * 1000

    const user = await customersModel.create({
      name,
      email,
      password,
      phone,
      otp,
      role,
      otpExpiresAt,
    })

    await sendEmail(
      email,
      "Email tasdiqlash kodi",
      `Sizning tasdiqlash kodingiz: ${otp} (5 daqiqa amal qiladi)`
    );

    res.status(201).json({
      message: "Foydalanuvchi yaratildi. Tasdiqlash kodi emailingizga yuborildi.",
    })
  } catch (error) {
    next(error)
  }
}

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, code } = req.body
    const user = await customersModel.findOne({ email })
    if (!user){
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" })
    }

    if (user.isVerified){
      return res.status(400).json({ message: "Hisob allaqachon tasdiqlangan" })
    }

    if (String(user.otp) !== String(code)) {
      return res.status(400).json({ message: "Kod noto'g'ri" })
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Kod muddati tugagan" })
    }

    user.isVerified = true
    user.otp = null   
    user.otpExpiresAt = null
    await user.save()
    res.status(200).json({ message: "Email muvaffaqiyatli tasdiqlandi" })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await customersModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" })
    }

    if (!user.isVerified){
      return res.status(403).json({ message: "Hisob tasdiqlanmagan. Avval emailni tasdiqlang." })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Email yoki parol xato" })

    const accessToken = generateAccessToken({ id: user._id, role: user.role })
    const refreshToken = generateRefreshToken({ id: user._id })

    user.accessToken = accessToken
    user.refreshToken = refreshToken
    await user.save()

    res.status(200).json({ message: "Kirish muvaffaqiyatli", accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
}

export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken){
      return res.status(400).json({ message: "Refresh token kerak" })
    }

    const decoded = verifyToken(refreshToken, config.jwt.refreshSecret)
    const user = await customersModel.findById(decoded.id)
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Noto'g'ri token" });
    }

    const newAccess = generateAccessToken({ id: user._id, role: user.role })
    user.accessToken = newAccess
    await user.save()

    res.status(200).json({ message: "Access token yangilandi", accessToken: newAccess })
  } catch (error) {
    next(error)
  }
}

export const profile = async (req, res, next) => {
  try {
    const user = await customersModel.findById(req.user.id).select("-password")
    res.status(200).json({ message: "Profil ma'lumotlari", data: user })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const users = await customersModel.find()
    res.status(200).json({
      message: "Barcha foydalanuvchilar",
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error)
  }
}



export const deleted = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = req.user

    if (!user || !user._id) {
      return res.status(401).json({
        success: false,
        message: "Token xato yoki foydalanuvchi topilmadi",
      })
    }

    const targetUser = await customersModel.findById(id)
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Foydalanuvchi topilmadi",
      });
    }

    if (user.role === "customer") {
      return res.status(403).json({
        success: false,
        message: "Sizda bu amalni bajarish huquqi yo'q",
      });
    }

    const isSameUser = targetUser._id.toString() === user._id.toString()

    if (user.role === "manager") {
      if (isSameUser || targetUser.role === "customer") {
        await customersModel.findByIdAndDelete(id)
        return res.status(200).json({
          success: true,
          message: "Foydalanuvchi o'chirildi",
        });
      }
      return res.status(403).json({
        success: false,
        message: "Siz bu foydalanuvchini o'chira olmaysiz",
      });
    }

    if (user.role === "admin") {
      await customersModel.findByIdAndDelete(id)
      return res.status(200).json({
        success: true,
        message: "Foydalanuvchi o'chirildi",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Ruxsat yo'q",
    });
  } catch (error) {
    console.error("Delete error:", error)
    next(error)
  }
}


