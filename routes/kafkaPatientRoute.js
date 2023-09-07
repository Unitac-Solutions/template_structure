const express = require('express');
const router = express.Router();
const kafkaPatientController = require('../Controllers/kafkaPatientController');

router.post('/', kafkaPatientController.sendPatientMessage);
router.get('/', kafkaPatientController.getPatientMessages);

module.exports = router;
