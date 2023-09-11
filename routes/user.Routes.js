const express = require("express");
const router = express.Router();

const { login,getUsers,getUser,createUser,updateUser,deleteUser} = require("../controllers/user.Controller");

const { checkToken, checkTokenAndAdmin, checkTokenASuperdAdmin } = require("../middleware/token_validation");

router.route("/").get(checkTokenAndAdmin, getUsers);
router.route("/:id").get(checkToken, getUser);
router.route("/").post(checkTokenAndAdmin, createUser);
router.route("/:id").put(checkTokenAndAdmin, updateUser);
router.route("/:id").delete(checkTokenAndAdmin, deleteUser);
router.route("/login").post(login);

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