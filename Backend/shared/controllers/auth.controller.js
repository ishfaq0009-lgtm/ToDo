const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET .env mein nahi hai!");
}

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    if (!name || !email || !password)
      return res.status(400).json({ message: "Saari fields bharo" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password kam az kam 6 characters ka ho" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Yeh email pehle se registered hai" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: "Yeh email pehle se registered hai" });
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    if (!email || !password)
      return res.status(400).json({ message: "Email aur password do" });

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Email ya password ghalat hai" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};