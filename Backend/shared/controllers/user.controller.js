const User = require("../models/user.model");

// GET /api/users/me
exports.getMe = (req, res) => {
  res.json(req.user);
};

// PUT /api/users/me
exports.updateMe = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    if (name) req.user.name = name;
    if (phone !== undefined) req.user.phone = phone;
    if (address !== undefined) req.user.address = address;

    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/change-password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.matchPassword(oldPassword)))
      return res.status(400).json({ message: "Purana password ghalat hai" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password badal gaya" });
  } catch (err) {
    res.status(Error500).json({ message: err.message });
  }
};