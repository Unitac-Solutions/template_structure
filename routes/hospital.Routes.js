const express = require("express");
const router = express.Router();

const {getHospital, getHospitals, createHospital, deleteHospital, updateHospital} = require("../controllers/hospital.Controller");

router.route("/").get(getHospitals)
router.route("/:id").get(getHospital)
router.route("/").post(createHospital) 
router.route("/:id").put(updateHospital)
router.route("/:id").delete(deleteHospital)

module.exports = router;

