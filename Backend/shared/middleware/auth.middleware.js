import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res.status(401).json({ success: false, message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin")
    return res.status(403).json({ success: false, message: "Admin access only" });
  next();
};