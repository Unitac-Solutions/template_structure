const express = require("express");
const router = express.Router();
const {getvital_examination, getvital_examinations, createvital_examination, deletevital_examination, updatevital_examination} = require("../controllers/vitalExamination.Controller");
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.route("/").get(checkToken, getvital_examinations)
router.route("/:id").get(checkToken, getvital_examination)
router.route("/").post(checkToken, checkToken, createvital_examination)
router.route("/:id").put(checkToken, updatevital_examination)
router.route("/:id").delete(deletevital_examination)

module.exports = router;