const express = require("express");
const router = express.Router();

const {getEmplouees, getEmployee, createEmployee, updateEmployee, deleteEmployee} = require("../controllers/employee.Controller")

router.route('/').get(getEmplouees)
router.route('/:id').get(getEmployee)
router.route('/:id').delete(deleteEmployee)
router.route('/').post(createEmployee)
router.route('/:id').put(updateEmployee);

module.exports = router;