const express = require("express");
const router = express.Router();
const {getpersonnel, getpersonnels, createpersonnel, deletepersonnel, updatepersonnel} = require("../controllers/personnel.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(getpersonnels)
router.route("/:id").get(getpersonnel)
router.route("/").post(createpersonnel)
router.route("/:id").put(updatepersonnel)
router.route("/:id").delete(deletepersonnel)

module.exports = router;