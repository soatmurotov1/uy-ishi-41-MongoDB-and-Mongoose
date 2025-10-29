import bcrypt from "bcrypt";
import customerModel from "../models/customers.model.js";
import { generateToken, verifyToken } from "../helper/jwt.js";
import { config } from "../config/index.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.validatedData || req.body;
    const exist = await customerModel.findOne({ email });
    if (exist){
      return res.status(400).json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });
    }
    const newUser = await customerModel.create({
      name,
      phone,
      email,
      password,
      role,
    })

    const payload = { id: newUser._id, role: newUser.role, email: newUser.email };
    const accessToken = generateToken(payload, config.jwt.accessSecret, "5m");
    const refreshToken = generateToken(payload, config.jwt.refreshSecret, "10m");
    newUser.accessToken = accessToken
    newUser.refreshToken = refreshToken
    await newUser.save()
    res.status(201).json({
      success: true,
      message: `${newUser.role} ro'yxatdan o'tdi`,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}


export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.validatedData || req.body;

    const user = await customerModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User topilmadi" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Parol noto'g'ri" });
    }

    const payload = { id: user._id, role: user.role, email: user.email };
    const accessToken = generateToken(payload, config.jwt.accessSecret, "5m");
    const refreshToken = generateToken(payload, config.jwt.refreshSecret, "10m");

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login muvaffaqiyatli",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};




export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token kerak" });
    }
    let decoded
    try {
      decoded = verifyToken(refreshToken, config.jwt.refreshSecret);
    } catch (err) {
      return res.status(401).json({ message: "Refresh token yaroqsiz yoki muddati tugagan" });
    }
    const user = await customerModel.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Yaroqsiz refresh token" });
    }
    
    const newAccessToken = generateToken(
      { id: user._id, role: user.role },
      config.jwt.accessSecret,
      "5m"
    );
    const newRefreshToken = generateToken(
      { id: user._id, role: user.role },
      config.jwt.refreshSecret,
      "10m"
    )
    
    user.refreshToken = newRefreshToken;
    await user.save()
    res.json({
      success: true,
      message: "Yangi access token yaratildi",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
}


export const profileUser = async (req, res, next) => {
  try {
    if (!req.user){
      return res.status(401).json({ success: false, message: "Token yaroqsiz yoki mavjud emas" })
    }
    const user = await customerModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Ruxsat yo'q" });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await customerModel.find().select("-password").skip(skip).limit(limit)
    const total = await customerModel.countDocuments()
    res.json({
      success: true,
      page,
      total,
      data: users,
    })
  } catch (error) {
    next(error)
  }
}


export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Bu amal uchun ruxsat yo'q" });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await customerModel.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    res.json({ success: true, data: updated })
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Sizda bu amalni bajarishga ruxsat yo'q" });
    }
    const deleted = await customerModel.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    res.json({ success: true, message: "Foydalanuvchi o'chirildi" });
  } catch (error) {
    next(error);
  }
};

