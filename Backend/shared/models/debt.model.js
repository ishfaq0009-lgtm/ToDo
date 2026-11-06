const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema(
  {
    lender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 1 },
    note: { type: String, trim: true },
    dueDate: Date,
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Debt", debtSchema);