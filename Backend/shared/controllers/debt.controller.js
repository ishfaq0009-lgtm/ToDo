const Debt = require("../models/debt.model");
const User = require("../models/user.model");

// validation/id ka masla 400, baqi 500
const handleError = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError")
    return res.status(400).json({ message: err.message });
  res.status(500).json({ message: "Server error", error: err.message });
};

// POST /api/debts (main lender hun)
exports.createDebt = async (req, res) => {
  try {
    const { borrowerEmail, note, dueDate } = req.body;
    const amount = Number(req.body.amount);

    if (!borrowerEmail || !amount || amount < 1)
      return res
        .status(400)
        .json({ message: "Email aur sahi amount zaroori hain" });

    const borrower = await User.findOne({
      email: borrowerEmail.trim().toLowerCase(),
    });
    if (!borrower)
      return res.status(404).json({ message: "Is email ka user nahi mila" });
    if (borrower._id.equals(req.user._id))
      return res.status(400).json({ message: "Apne aap ko qarz nahi de sakte" });

    const debt = await Debt.create({
      lender: req.user._id,
      borrower: borrower._id,
      amount,
      note,
      dueDate,
    });
    res.status(201).json(debt);
  } catch (err) {
    handleError(res, err);
  }
};

// GET /api/debts (jo maine diye + jo maine liye)
exports.getMyDebts = async (req, res) => {
  try {
    const debts = await Debt.find({
      $or: [{ lender: req.user._id }, { borrower: req.user._id }],
    })
      .populate("lender", "name email")
      .populate("borrower", "name email")
      .sort({ createdAt: -1 });
    res.json(debts);
  } catch (err) {
    handleError(res, err);
  }
};

// PUT /api/debts/:id/paid (sirf lender "paid" mark kar sakta hai)
exports.markPaid = async (req, res) => {
  try {
    const debt = await Debt.findOne({ _id: req.params.id, lender: req.user._id });
    if (!debt) return res.status(404).json({ message: "Qarz nahi mila" });
    if (debt.status === "paid")
      return res.status(400).json({ message: "Ye qarz pehle se paid hai" });

    debt.status = "paid";
    await debt.save();
    res.json(debt);
  } catch (err) {
    handleError(res, err);
  }
};

// GET /api/debts/profile/:userId (dusre ki profile, SIRF dekhna)
exports.viewProfile = async (req, res) => {
  try {
    const otherId = req.params.userId;
    const relation = {
      $or: [
        { lender: req.user._id, borrower: otherId },
        { lender: otherId, borrower: req.user._id },
      ],
    };

    if (!(await Debt.exists(relation)))
      return res
        .status(403)
        .json({ message: "Aap is user ki profile nahi dekh sakte" });

    const profile = await User.findById(otherId).select("-password");
    if (!profile) return res.status(404).json({ message: "User nahi mila" });

    const debts = await Debt.find(relation).sort({ createdAt: -1 });
    res.json({ profile, debts });
  } catch (err) {
    handleError(res, err);
  }
};