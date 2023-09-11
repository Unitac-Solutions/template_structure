const express = require("express");
const router = express.Router();
const {getAnticipatedCares, getAnticipatedCare, createAnticipatedCare, deleteAnticipatedCare, updateAnticipatedCare} = require("../controllers/anticipatedCare.Controller");

router.route("/").get(getAnticipatedCares)
router.route("/:id").get(getAnticipatedCare)
router.route("/").post(createAnticipatedCare)
router.route("/:id").put(updateAnticipatedCare)
router.route("/:id").delete(deleteAnticipatedCare)

module.exports = router;