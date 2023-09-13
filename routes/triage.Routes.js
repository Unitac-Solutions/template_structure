const express = require("express");
const router = express.Router();
const {getTriages, getTriage, createTriage, updateTriage, deleteTriage} = require("../controllers/triage.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getTriages)
router.route("/:id").get(checkToken,getTriage)
router.route("/").post(checkToken,createTriage)
router.route("/:id").put(checkTokenAndAdmin,updateTriage)
router.route("/:id").delete(checkTokenAndAdmin,deleteTriage)

module.exports = router;