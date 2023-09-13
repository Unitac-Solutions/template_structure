const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');

const {
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  refresh,
  checkUser,
  Logout
} = require("../controllers/user.Controller");

const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin, checkAUser} = require("../middleware/token_validation");

router.route("/").get( checkToken,getUsers);
router.route("/refresh").post(refresh);
router.route("/:id").get(getUser);
router.route("/").post(createUser);
router.route("/:id").put(checkTokenAndAdmin, updateUser);
router.route("/:id").delete(checkTokenAndAdmin, deleteUser);
router.route("/login").post(login);
router.route("/checkUser").post(checkAUser,checkUser);
router.route("/logout").post(Logout);
// Custom error handler middleware
router.use((err, req, res, next) => {
  console.error(err.stack);

  if (!res.headersSent) {
    res.status(500).json({
      success: 0,
      message: "Internal server error"
    });
  }
});

module.exports = router;
