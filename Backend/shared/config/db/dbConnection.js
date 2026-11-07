const mongoose = require("mongoose");

let isConnected = false;

async function dbConnection() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Focusly",
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = true;
    console.log("The db is running");
  } catch (error) {
    console.log(error, "The error from db connection");
  }
}

module.exports = dbConnection;