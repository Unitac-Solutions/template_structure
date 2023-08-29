const express = require("express");
const router = express.Router();

const {getPatient, getPatients, createPatient, deletePatient, updatePatient} = require("../controllers/patient.Controller");

router.route("/").get(getPatients)
router.route("/:id").get(getPatient)
router.route("/").post(createPatient) 
router.route("/:id").put(updatePatient)
router.route("/:id").delete(deletePatient)

module.exports = router;

