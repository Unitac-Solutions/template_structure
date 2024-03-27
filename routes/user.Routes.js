const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();
const cookieParser = require('cookie-parser');
const { login, getUsers, getUser, createUser, updateUser, deleteUser, refresh, checkUser, Logout, 
  passwordForgot, resetPassword, updatePassword, getUserByAuth, updateUserWithoutPassword, 
  verifyEmail, getUserByGUID, updateUserByGUID, deleteUserByGUID
} = require("../controllers/user.Controller");


router.route("/").get(getUsers);
router.route("/refresh").post(refresh);
router.route("/:id").get( getUser);
router.route("/token/getUserByAuth").get( getUserByAuth);
router.route("/").post(createUser);
router.route("/:id").put( updateUser);
router.route("/:id").patch( updateUserWithoutPassword);
router.route("/:id").delete( deleteUser);
router.route("/login").post(login);
router.route("/checkUser").post( checkUser);
router.route("/logout").post(Logout);
router.route("/forgotPassword").post(passwordForgot);
router.route("/resetPassword").post(resetPassword);
router.route("/verify_email").patch(verifyEmail);
router.route("/guid/:guid").get(getUserByGUID);
router.route("/guid/:guid").put( updateUserByGUID);
router.route("/guid/:guid").delete( deleteUserByGUID);
router.route("/updatePassword").post(updatePassword);
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
