const express = require('express');
const router = express.Router();
const kafkaHospitalController = require('../controllers/kafkaHospitalController');
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.post('/',checkToken, kafkaHospitalController.sendHospitalMessage);
router.get('/', checkToken,kafkaHospitalController.getHospitalMessages);

module.exports = router;
