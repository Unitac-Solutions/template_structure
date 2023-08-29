const express = require("express");
const router = express.Router();
const {getAnticipatedCare, getAnticipatedCareId, createAnticipatedCare, deleteAnticipatedCareId, updateAnticipatedCare} = require("../controllers/anticipated_care.Controller");



router.route("/").get(getAnticipatedCare)
router.route("/:id").get(getAnticipatedCareId)
router.route("/").post(createAnticipatedCare)
router.route("/:id").put(updateAnticipatedCare)
router.route("/:id").delete(deleteAnticipatedCareId)

module.exports = router;