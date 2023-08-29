const express = require("express");
const router = express.Router();
const {getsystematic, getsystematics, createsystematic, deletesystematic, updatesystematic} = require("../controllers/systematic.Controller");

router.route("/").get(getsystematics)
router.route("/:id").get(getsystematic)
router.route("/").post(createsystematic)
router.route("/:id").put(updatesystematic)
router.route("/:id").delete(deletesystematic)

module.exports = router;