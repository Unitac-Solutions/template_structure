const express = require('express');
const router = express.Router();
const kafkaHospitalController = require('../Controllers/kafkaHospitalController');

router.post('/', kafkaHospitalController.sendHospitalMessage);
router.get('/', kafkaHospitalController.getHospitalMessages);

module.exports = router;
