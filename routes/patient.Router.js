const express = require("express");
const router = express.Router();
const {getPatients, getPatient, updatePatient,
 deletePatient, createPatient} = require("../controllers/patient.Controller");
const validateToken = require("../middlewares/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getPatients)
router.route("/:id").get(getPatient)
router.route("/").post(createPatient)
router.route("/:id").put(updatePatient)
router.route("/:id").delete(deletePatient)

module.exports = router;