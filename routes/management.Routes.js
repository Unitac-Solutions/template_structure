const express = require("express");
const router = express.Router();

const {getmanagement, getmanagements, createmanagement, deletemanagement, updatemanagement} = require("../controllers/management.Controller");

router.route("/").get(getmanagements)
router.route("/:id").get(getmanagement)
router.route("/").post(createmanagement) 
router.route("/:id").put(updatemanagement)
router.route("/:id").delete(deletemanagement)

module.exports = router;

