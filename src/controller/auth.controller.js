import { generateToken, verifyToken } from "../helper/jwt.js";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import customerModel from "../models/customers.model.js";


export const registerUser = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.validatedData;

    const exist = await customerModel.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });

    const newUser = await customerModel.create({
      name,
      phone,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      message: `${newUser.role} ro'yxatdan o'tdi`,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.validatedData;

    const user = await customerModel.findOne({ email, role });
    if (!user)
      return res.status(404).json({ message: `${role} topilmadi` });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "xato parol" });

    const accessToken = generateToken(
      { id: user._id, role: user.role },
      config.jwt.accessSecret,
      "15m"
    );
    const refreshToken = generateToken(
      { id: user._id, role: user.role },
      config.jwt.refreshSecret,
      "7d"
    );

    res.json({
      success: true,
      message: `${role} tizimga kirdi`,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};


export const profileUser = async (req, res) => {
  res.json({ success: true, data: req.user });
};


export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.validatedData;

    const decoded = verifyToken(refreshToken, config.jwt.refreshSecret);
    if (!decoded)
      return res.status(401).json({ message: "Refresh token xato" });

    const accessToken = generateToken(
      { id: decoded.id, role: decoded.role },
      config.jwt.accessSecret,
      "15m"
    );

    res.json({ success: true, accessToken });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await customerModel.find().select("-password");
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updated = await customerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "user not found" });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await customerModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "user not found" });

    res.json({ success: true, message: "user deleted" });
  } catch (error) {
    next(error);
  }
};
