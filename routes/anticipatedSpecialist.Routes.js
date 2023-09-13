const express = require("express");
const router = express.Router();
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");
const {getspecialist, getspecialists, createspecialist, deletespecialist, updatespecialist} = require("../controllers/anticipatedSpecialist.Controller");

router.route("/").get(checkToken,getspecialists)
router.route("/:id").get(checkToken,getspecialist)
router.route("/").post(checkToken,checkToken,createspecialist)
router.route("/:id").put(checkTokenAndAdmin,updatespecialist)
router.route("/:id").delete(checkTokenAndAdmin,deletespecialist)

module.exports = router;