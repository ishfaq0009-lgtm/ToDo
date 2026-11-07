const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createDebt,
  getMyDebts,
  markPaid,
  viewProfile,
} = require("../controllers/debt.controller");

router.use(auth);

router.post("/", createDebt);
router.get("/", getMyDebts);
router.get("/profile/:userId", viewProfile); // sirf GET, koi edit/delete nahi
router.put("/:id/paid", markPaid);

module.exports = router;