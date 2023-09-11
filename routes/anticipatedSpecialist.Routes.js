const express = require("express");
const router = express.Router();
const {getspecialist, getspecialists, createspecialist, deletespecialist, updatespecialist} = require("../controllers/anticipatedSpecialist.Controller");

router.route("/").get(getspecialists)
router.route("/:id").get(getspecialist)
router.route("/").post(createspecialist)
router.route("/:id").put(updatespecialist)
router.route("/:id").delete(deletespecialist)

module.exports = router;