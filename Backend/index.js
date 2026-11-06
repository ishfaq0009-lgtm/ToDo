import "dotenv/config";
import express from "express";
import cors from "cors";
import dbConnection from "./shared/config/db/dbConnection.js";

import authRoutes from "./shared/routes/auth.routes.js";
import userRoutes from "./shared/routes/user.routes.js";
import todoRoutes from "./shared/routes/todo.routes.js";
import debtRoutes from "./shared/routes/debt.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // deploy ke baad Vercel link .env mein yahan aayega
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
dbConnection();

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/debts", debtRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
  console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);
});

export default app;