import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8"]);

async function dbconection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("This is db connect");
  } catch (error) {
    console.log("This is db error:", error.message);
  }
}

export default dbconection;
