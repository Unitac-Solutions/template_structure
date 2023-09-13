const express = require("express");
const router = express.Router();
const {getgeneral_examination, getgeneral_examinations, creategeneral_examination, deletegeneral_examination, updategeneral_examination} = require("../controllers/generalExamination.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getgeneral_examinations)
router.route("/:id").get(checkToken,getgeneral_examination)
router.route("/").post(checkToken,creategeneral_examination)
router.route("/:id").put(checkTokenAndAdmin,updategeneral_examination)
router.route("/:id").delete(checkTokenAndAdmin,deletegeneral_examination)

module.exports = router;