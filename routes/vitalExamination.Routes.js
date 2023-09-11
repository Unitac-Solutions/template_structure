const express = require("express");
const router = express.Router();
const {getvital_examination, getvital_examinations, createvital_examination, deletevital_examination, updatevital_examination} = require("../controllers/vitalExamination.Controller");

router.route("/").get(getvital_examinations)
router.route("/:id").get(getvital_examination)
router.route("/").post(createvital_examination)
router.route("/:id").put(updatevital_examination)
router.route("/:id").delete(deletevital_examination)

module.exports = router;