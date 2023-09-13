const express = require("express");
const router = express.Router();
const {getAnticipatedCares, getAnticipatedCare, createAnticipatedCare, deleteAnticipatedCare, updateAnticipatedCare} = require("../controllers/anticipatedCare.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");



router.route("/").get(checkToken,getAnticipatedCares)
router.route("/:id").get(checkToken,getAnticipatedCare)
router.route("/").post(checkToken,createAnticipatedCare)
router.route("/:id").put(checkTokenAndAdmin,updateAnticipatedCare)
router.route("/:id").delete(checkTokenAndAdmin,deleteAnticipatedCare)

module.exports = router;