const express = require("express");
const router = express.Router();
const {getgeneral_examination, getgeneral_examinations, creategeneral_examination, deletegeneral_examination, updategeneral_examination} = require("../controllers/general_examination.Controller");

router.route("/").get(getgeneral_examinations)
router.route("/:id").get(getgeneral_examination)
router.route("/").post(creategeneral_examination)
router.route("/:id").put(updategeneral_examination)
router.route("/:id").delete(deletegeneral_examination)

module.exports = router;