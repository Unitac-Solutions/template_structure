const express = require("express");
const router = express.Router();
const {getclinical_history, getclinical_historys, createclinical_history, deleteclinical_history, updateclinical_history} = require("../controllers/clinicalHistory.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getclinical_historys)
router.route("/:id").get(checkToken,getclinical_history)
router.route("/").post(checkToken,createclinical_history)
router.route("/:id").put(checkTokenAndAdmin,updateclinical_history)
router.route("/:id").delete(checkTokenAndAdmin,deleteclinical_history)

module.exports = router;