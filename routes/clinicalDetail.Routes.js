const express = require("express");
const router = express.Router();

const {getclinical, getclinicals, createclinical, updateclinical, deleteclinical} = require("../controllers/clinicalDetail.Controller");

router.route("/").get(getclinicals)
router.route("/:id").get(getclinical)
router.route("/").post(createclinical) 
router.route("/:id").put(updateclinical)
router.route("/:id").delete(deleteclinical)

module.exports = router;

