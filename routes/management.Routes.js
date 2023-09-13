const express = require("express");
const router = express.Router();
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

const {getmanagements, getmanagement, createmanagement, updatemanagement, deletemanagement} = require("../controllers/management.Controller");

router.route("/").get(checkToken,getmanagements)
router.route("/:id").get(checkToken,getmanagement)
router.route("/").post(checkToken,createmanagement) 
router.route("/:id").put(checkTokenAndAdmin,updatemanagement)
router.route("/:id").delete(checkTokenAndAdmin,deletemanagement)

module.exports = router;

