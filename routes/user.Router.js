const express = require("express");
const route = express.Router();
const {loginUser, currentUser, registerUser} = require("../controllers/user.Controller")
const validateToken = require("../middlewares/validateTokenHandler")

route.post("/register",registerUser)
route.post("/login", loginUser)
route.get("/current", validateToken,  currentUser)

module.exports = route;