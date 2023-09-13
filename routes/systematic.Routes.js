const express = require("express");
const router = express.Router();
const {getsystematic, getsystematics, createsystematic, deletesystematic, updatesystematic} = require("../controllers/systematic.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken,getsystematics)
router.route("/:id").get(checkToken,getsystematic)
router.route("/").post(checkToken,createsystematic)
router.route("/:id").put(checkTokenAndAdmin,updatesystematic)
router.route("/:id").delete(checkTokenAndAdmin,deletesystematic)

module.exports = router;