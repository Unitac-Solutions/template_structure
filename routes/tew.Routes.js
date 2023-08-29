const express = require("express");
const router = express.Router();
const {gettew, gettews, createtew, deletetew, updatetew} = require("../controllers/tew.Controller");

router.route("/").get(gettews)
router.route("/:id").get(gettew)
router.route("/").post(createtew)
router.route("/:id").put(updatetew)
router.route("/:id").delete(deletetew)

module.exports = router;