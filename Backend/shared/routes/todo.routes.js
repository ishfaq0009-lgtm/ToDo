const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getStats,
} = require("../controllers/todo.controller");

router.use(auth);

router.get("/stats", getStats); // /:id se pehle likhna zaroori hai
router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;