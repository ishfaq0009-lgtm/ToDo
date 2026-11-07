const Todo = require("../models/todo.model");

// error ka jawab: validation/id ka masla 400, baqi 500
const handleError = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError")
    return res.status(400).json({ message: err.message });
  res.status(500).json({ message: "Server error", error: err.message });
};

// GET /api/todos?status=pending&priority=high&search=abc
exports.getTodos = async (req, res) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.search) {
      const safe = req.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: safe, $options: "i" };
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    handleError(res, err);
  }
};

// POST /api/todos
exports.createTodo = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: "Title zaroori hai" });

    const todo = await Todo.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id, // hamesha token wale user ka
    });
    res.status(201).json(todo);
  } catch (err) {
    handleError(res, err);
  }
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  try {
    // sirf wahi fields lo jo bheji gayi hain
    const updates = {};
    ["title", "description", "status", "priority", "dueDate"].forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // sirf apna todo
      updates,
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo nahi mila" });
    res.json(todo);
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!todo) return res.status(404).json({ message: "Todo nahi mila" });
    res.json({ message: "Todo delete ho gaya" });
  } catch (err) {
    handleError(res, err);
  }
};

// GET /api/todos/stats (dashboard ke liye)
exports.getStats = async (req, res) => {
  try {
    const u = req.user._id;
    const [total, pending, inProgress, completed, overdue] = await Promise.all([
      Todo.countDocuments({ user: u }),
      Todo.countDocuments({ user: u, status: "pending" }),
      Todo.countDocuments({ user: u, status: "in-progress" }),
      Todo.countDocuments({ user: u, status: "completed" }),
      Todo.countDocuments({
        user: u,
        status: { $ne: "completed" },
        dueDate: { $lt: new Date() },
      }),
    ]);
    res.json({ total, pending, inProgress, completed, overdue });
  } catch (err) {
    handleError(res, err);
  }
};