const express = require("express");
const router = express.Router();
const {getTriages, getTriage, createTriage, updateTriage, deleteTriage} = require("../controllers/triage.Controller");

router.route("/").get(getTriages)
router.route("/:id").get(getTriage)
router.route("/").post(createTriage)
router.route("/:id").put(updateTriage)
router.route("/:id").delete(deleteTriage)

module.exports = router;