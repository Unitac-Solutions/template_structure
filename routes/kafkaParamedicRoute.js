const express = require('express');
const router = express.Router();
const kafkaParamedicController = require('../Controllers/kafkaParamedicController');

router.post('/', kafkaParamedicController.sendParamedicMessage);
router.get('/', kafkaParamedicController.getParamedicMessages);

module.exports = router;
