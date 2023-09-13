const express = require("express");
const router = express.Router();
const {gethandover, gethandovers, createhandover, deletehandover, updatehandover} = require("../controllers/handover.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,gethandovers)
router.route("/:id").get(checkToken,gethandover)
router.route("/").post(checkToken,createhandover)
router.route("/:id").put(checkTokenAndAdmin,updatehandover)
router.route("/:id").delete(checkTokenAndAdmin,deletehandover)

module.exports = router;