const express = require("express");
const router = express.Router();

const {getHospital, getHospitals, createHospital, deleteHospital, updateHospital} = require("../controllers/hospital.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getHospitals)
router.route("/:id").get(checkToken,getHospital)
router.route("/").post(checkToken,createHospital) 
router.route("/:id").put(checkTokenAndAdmin,updateHospital)
router.route("/:id").delete(checkTokenAndAdmin,deleteHospital)

module.exports = router;

