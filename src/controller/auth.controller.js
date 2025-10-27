import customerModel from "../models/customers.model.js";
import delivery_staffModel from "../models/delivery_staff.model.js";
import { verifyToken, generateToken } from "../helper/jwt.js";
import config from "../config/index.js"

export const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.validatedData;

    const data = await customerModel.findOne({ email });
    if (!data) {
      return res.status(404).json({ success: false, message: "customer not found" });
    }

    const validPassword = await data.comparePassword(password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: "email yoki password xato" });
    }

    const payload = { id: data._id, name: data.name };
    const accessToken = await generateToken(payload, config.jwt.accessSecret, "30d");
    const refreshToken = await generateToken(payload, config.jwt.refreshSecret, "1h");

    data.accessToken = accessToken;
    data.refreshToken = refreshToken;

    const { password: _, ...rest } = data.toObject();
    return res.status(200).json({
      success: true,
      message: "tizimga kirildi",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};




export const registerCustomer = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.validatedData;

    const existing = await customerModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "email allaqachon bor" });
    }

    const newData = await customerModel.create(req.validatedData);
    const payload = { id: newData._id, name: newData.name };

    const accessToken = await generateToken(payload, config.jwt.accessSecret, "30d");
    const refreshToken = await generateToken(payload, config.jwt.refreshSecret, "1h");

    newData.accessToken = accessToken;
    newData.refreshToken = refreshToken;

    const { password: _, ...rest } = newData.toObject();
    return res.status(201).json({
      success: true,
      message: "registared",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};



export const loginStaff = async (req, res, next) => {
  try {
    const { name, password } = req.validatedData;

    const data = await delivery_staffModel.findOne({ name });
    if (!data) {
      return res.status(404).json({ success: false, message: "staff not found" });
    }

    const validPassword = await data.comparePassword(password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: "name yoki password xato" });
    }

    const payload = { id: data._id, name: data.name };
    const accessToken = await generateToken(payload, config.jwt.accessSecret, "30d");
    const refreshToken = await generateToken(payload, config.jwt.refreshSecret, "1h");

    data.accessToken = accessToken;
    data.refreshToken = refreshToken;

    const { password: _, ...rest } = data.toObject();
    return res.status(200).json({
      success: true,
      message: "STAFF LOGIN SUCCESS",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};



export const registerStaff = async (req, res, next) => {
  try {
    const { name } = req.validatedData;

    const existing = await delivery_staffModel.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: "staff allaqachon mavjud" });
    }

    const newData = await delivery_staffModel.create(req.validatedData);
    const payload = { id: newData._id, name: newData.name };

    const accessToken = await generateToken(payload, config.jwt.accessSecret, "30d");
    const refreshToken = await generateToken(payload, config.jwt.refreshSecret, "1h");

    newData.accessToken = accessToken;
    newData.refreshToken = refreshToken;

    const { password: _, ...rest } = newData.toObject();
    return res.status(201).json({
      success: true,
      message: "STAFF REGISTERED",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};


export const profileCustomer = async (req, res) => {
  return res.status(200).json({ success: true, data: req.user });
};

export const profileStaff = async (req, res) => {
  return res.status(200).json({ success: true, data: req.user });
};


export const refreshAccessCustomer = async (req, res, next) => {
  try {
    const { refreshToken } = req.validatedData;
    const verified = verifyToken(refreshToken, config.jwt.refreshSecret);

    const user = await customerModel.findById(verified.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const payload = { id: user._id, name: user.name };
    const accessToken = await generateToken(payload, config.jwt.accessSecret, "1h");

    return res.status(200).json({ success: true, accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessStaff = async (req, res, next) => {
  try {
    const { refreshToken } = req.validatedData;
    const verified = verifyToken(refreshToken, config.jwt.refreshSecret);

    const user = await delivery_staffModel.findById(verified.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const payload = { id: user._id, name: user.name };
    const accessToken = await generateToken(payload, config.jwt.accessSecret, "1h");

    return res.status(200).json({ success: true, accessToken });
  } catch (error) {
    next(error);
  }
};
