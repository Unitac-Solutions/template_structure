const express = require("express");
const router = express.Router();
const {gettew, gettews, createtew, deletetew, updatetew} = require("../controllers/tew.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,gettews)
router.route("/:id").get(checkToken,gettew)
router.route("/").post(checkToken,createtew)
router.route("/:id").put(checkTokenAndAdmin,updatetew)
router.route("/:id").delete(checkTokenAndAdmin,deletetew)

module.exports = router;