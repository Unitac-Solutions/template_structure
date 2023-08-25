const express = require("express");
const asyncHandler = require("express-async-handler")
const service = require("../services/employee.services")

const getEmplouees =  asyncHandler( async (req, res) => {
   const [employees] =  await  service.getAllEmployes();
    res.status(200).send(employees)
})

const getEmployee =  asyncHandler( async (req, res) => {
    const employee =  await  service.getEmployebyId(req.params.id);
    if (employee.length === 0)
        res.send(404).json('no record found with given id :'+ req.params.id)
    else
     res.send( employee)
 })

 const deleteEmployee =  asyncHandler( async (req, res) => {
    const affectedRows =  await  service.deleteEmployebyId(req.params.id);
    if (!affectedRows)
        res.status(404).json('no record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
 })

 const createEmployee =  asyncHandler(  async (req, res) => {
    const {name, employee_code, salary } = req.body;
    if (!name || !employee_code || !salary) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  service.createEmployee(req.body);
        res.status(201).send( "Created Succesfully.")
 })

 const updateEmployee =  asyncHandler(  async (req, res) => {
    const data =  await service.editEmployee(req.body, req.params.id);
    if (!data) {
        res.status(404);
        throw new Error("Employee not found");
    }
    const updatedemployee = await service.editEmployee(
        req.params.id,
        req.body
    );
    res.status(202).send( updatedemployee)
})

module.exports = {getEmplouees, getEmployee, createEmployee, deleteEmployee, 
    updateEmployee};