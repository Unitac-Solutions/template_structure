const express = require("express");
const router = express.Router();
const {getincident, getincidents, createincident, deleteincident, updateincident} = require("../controllers/incident.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getincidents)
router.route("/:id").get(checkToken,getincident)
router.route("/").post(checkToken,createincident)
router.route("/:id").put(checkTokenAndAdmin,updateincident)
router.route("/:id").delete(checkTokenAndAdmin,deleteincident)

module.exports = router;