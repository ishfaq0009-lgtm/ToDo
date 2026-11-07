const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title zaroori hai"], trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    dueDate: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);