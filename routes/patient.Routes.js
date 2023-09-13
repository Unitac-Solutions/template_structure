const express = require("express");
const router = express.Router();
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");
const {getPatient, getPatients, createPatient, deletePatient, updatePatient} = require("../controllers/patient.Controller");

router.route("/").get(checkToken,getPatients)
router.route("/:id").get(checkToken,getPatient)
router.route("/").post(checkToken,createPatient) 
router.route("/:id").put(checkToken,updatePatient)
router.route("/:id").delete(checkTokenAndAdmin,deletePatient)

module.exports = router;

