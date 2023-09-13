const express = require("express");
const router = express.Router();
const {getmedical_aid, getmedical_aids, createmedical_aid, deletemedical_aid, updatemedical_aid} = require("../controllers/medicalAid.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get( checkToken,getmedical_aids)
router.route("/:id").get(checkToken,getmedical_aid)
router.route("/").post(checkToken,createmedical_aid)
router.route("/:id").put(checkTokenAndAdmin,updatemedical_aid)
router.route("/:id").delete(checkToken,deletemedical_aid)

module.exports = router;