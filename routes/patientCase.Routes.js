const express = require("express");
const router = express.Router();
const {getpatient_case, getpatient_cases, createpatient_case, deletepatient_case, updatepatient_case} = require("../controllers/patientCase.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getpatient_cases)
router.route("/:id").get(checkToken,getpatient_case)
router.route("/").post(checkToken,createpatient_case)
router.route("/:id").put(checkTokenAndAdmin,updatepatient_case)
router.route("/:id").delete(checkTokenAndAdmin,deletepatient_case)

module.exports = router;