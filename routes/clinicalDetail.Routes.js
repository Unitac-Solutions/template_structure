const express = require("express");
const router = express.Router();
const {getclinical, getclinicals, createclinical, updateclinical, deleteclinical} = require("../controllers/clinicalDetail.Controller");
const { checkToken, checkTokenAndAdmin, checkTokenASuperdAdmin} = require("../middleware/token_validation");


router.route("/").get(checkToken,getclinicals)
router.route("/:id").get(checkToken,getclinical)
router.route("/").post(checkToken,createclinical) 
router.route("/:id").put(checkTokenAndAdmin,updateclinical)
router.route("/:id").delete( checkTokenAndAdmin,deleteclinical)

module.exports = router;

