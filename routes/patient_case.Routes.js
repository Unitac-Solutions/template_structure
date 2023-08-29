const express = require("express");
const router = express.Router();
const {getpatient_case, getpatient_cases, createpatient_case, deletepatient_case, updatepatient_case} = require("../controllers/patient_case.Controller");

router.route("/").get(getpatient_cases)
router.route("/:id").get(getpatient_case)
router.route("/").post(createpatient_case)
router.route("/:id").put(updatepatient_case)
router.route("/:id").delete(deletepatient_case)

module.exports = router;