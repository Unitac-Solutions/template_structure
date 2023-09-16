const express = require('express');
const router = express.Router();
const kafkaParamedicController = require('../controllers/kafkaParamedicController');
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.post('/', kafkaParamedicController.sendParamedicMessage);
router.get('/', kafkaParamedicController.getParamedicMessages);

module.exports = router;
