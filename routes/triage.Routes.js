const express = require("express");
const router = express.Router();
const {gettriage, gettriages, createtriage, deletetriage, updatetriage} = require("../controllers/triage.Controller");

router.route("/").get(gettriages)
router.route("/:id").get(gettriage)
router.route("/").post(createtriage)
router.route("/:id").put(updatetriage)
router.route("/:id").delete(deletetriage)

module.exports = router;