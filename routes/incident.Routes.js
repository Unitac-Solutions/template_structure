const express = require("express");
const router = express.Router();
const {getincident, getincidents, createincident, deleteincident, updateincident} = require("../controllers/incident.Controller");

router.route("/").get(getincidents)
router.route("/:id").get(getincident)
router.route("/").post(createincident)
router.route("/:id").put(updateincident)
router.route("/:id").delete(deleteincident)

module.exports = router;