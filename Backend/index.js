import "dotenv/config";   // ⬅️ SABSE PEHLE — ye .env ko foran load karta hai
import express from "express";
import cors from "cors";
import dbconection from "./shared/config/db/dbconection.js";
import cookieParser from "cookie-parser";

dbconection();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET); // debug
});