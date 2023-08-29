
const express = require("express");
const router = express.Router();
const {getcomment_detail, getcomment_details, createcomment_detail, deletecomment_detail, updatecomment_detail} = require("../controllers/comment_detail.Controller");

router.route("/").get(getcomment_details)
router.route("/:id").get(getcomment_detail)
router.route("/").post(createcomment_detail)
router.route("/:id").put(updatecomment_detail)
router.route("/:id").delete(deletecomment_detail)

module.exports = router;