const express = require("express");
const router = express.Router();
const {getmedical_aid, getmedical_aids, createmedical_aid, deletemedical_aid, updatemedical_aid} = require("../controllers/medical_aid.Controller");

router.route("/").get(getmedical_aids)
router.route("/:id").get(getmedical_aid)
router.route("/").post(createmedical_aid)
router.route("/:id").put(updatemedical_aid)
router.route("/:id").delete(deletemedical_aid)

module.exports = router;