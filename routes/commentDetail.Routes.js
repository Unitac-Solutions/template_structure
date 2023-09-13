
const express = require("express");
const router = express.Router();
const {getcomment_detail, getcomment_details, createcomment_detail, deletecomment_detail, updatecomment_detail} = require("../controllers/commentDetail.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getcomment_details)
router.route("/:id").get(checkToken,getcomment_detail)
router.route("/").post(checkToken,createcomment_detail)
router.route("/:id").put(checkTokenAndAdmin,updatecomment_detail)
router.route("/:id").delete(checkTokenAndAdmin,deletecomment_detail)

module.exports = router;