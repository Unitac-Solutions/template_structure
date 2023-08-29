const express = require("express");
const router = express.Router();
const {gethandover, gethandovers, createhandover, deletehandover, updatehandover} = require("../controllers/handover.Controller");

router.route("/").get(gethandovers)
router.route("/:id").get(gethandover)
router.route("/").post(createhandover)
router.route("/:id").put(updatehandover)
router.route("/:id").delete(deletehandover)

module.exports = router;