const express = require("express");
const router = express.Router();

const {getclinical, getclinicals, createclinical, deleteclinical, updateclinical} = require("../controllers/clinical_detail.Controller");

router.route("/").get(getclinicals)
router.route("/:id").get(getclinical)
router.route("/").post(createclinical) 
router.route("/:id").put(updateclinical)
router.route("/:id").delete(deleteclinical)

module.exports = router;

