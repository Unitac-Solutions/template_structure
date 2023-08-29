const express = require("express");
const router = express.Router();
const {getclinical_history, getclinical_historys, createclinical_history, deleteclinical_history, updateclinical_history} = require("../controllers/clinical_history.Controller");

router.route("/").get(getclinical_historys)
router.route("/:id").get(getclinical_history)
router.route("/").post(createclinical_history)
router.route("/:id").put(updateclinical_history)
router.route("/:id").delete(deleteclinical_history)

module.exports = router;