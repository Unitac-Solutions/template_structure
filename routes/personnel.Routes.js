const express = require("express");
const router = express.Router();
const {getpersonnel, getpersonnels, createpersonnel, deletepersonnel, updatepersonnel} = require("../controllers/personnel.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getpersonnels)
router.route("/:id").get(checkToken,getpersonnel)
router.route("/").post(checkToken,createpersonnel)
router.route("/:id").put(checkTokenAndAdmin,updatepersonnel)
router.route("/:id").delete(checkTokenAndAdmin,deletepersonnel)

module.exports = router;