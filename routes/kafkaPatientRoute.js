const express = require('express');
const router = express.Router();
const kafkaPatientController = require('../controllers/kafkaPatientController');
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.post('/', kafkaPatientController.sendPatientMessage);
router.get('/',  kafkaPatientController.getPatientMessages);

module.exports = router;
