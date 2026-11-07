import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, address, role } = req.body;

    if (!name || !email || !phone || !password || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const requestedRole = role === "admin" ? "admin" : "user";

    // ✅ Admin sirf ek hi ho sakta hai
    if (requestedRole === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({
          success: false,
          message: "An admin already exists. Only one admin is allowed in the system.",
        });
      }
    }

    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashed,
      address,
      role: requestedRole,
    });

    const token = signToken(user);
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ New: Check if admin already exists
export const checkAdminExists = async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" }).select("_id name");
    res.json({ exists: !!admin, adminName: admin?.name || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is not registered as ${role}. Please select the correct account type.`,
      });
    }

    const token = signToken(user);
    res.cookie("token", token, cookieOptions);

    res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ success: true, message: "Logged out" });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};