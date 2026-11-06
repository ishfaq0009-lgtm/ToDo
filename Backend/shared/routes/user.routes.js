const router = require("express").Router();
const auth = require("../middleware/auth");
const { getMe, updateMe, changePassword } = require("../controllers/user.controller");

router.use(auth);

router.get("/me", getMe);
router.put("/me", updateMe);
router.put("/change-password", changePassword);

module.exports = router;