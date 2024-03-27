const express = require("express");
const asyncHandler = require("express-async-handler")

const Patient = require("../services/patient.Services")

//@desc Get all patients
//@route GET /api/patients
//@access private
const getPatients = asyncHandler( async ( req, res) => {
    const patients = await Patient.getAllPatients()
    if(!patients){   
        res.status(404).json({message: 'Patients not found'});
    }else{
        res.status(200).json(patients);
    }
});

const createPatient = asyncHandler(  async ( req, res)=> {
    const {username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  service.createEmployee(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getPatient = asyncHandler( async ( req, res) => {
    const patient = await Patient.getPatient(req.params.id);
    if(!patient ){
        res.status(404);
        throw new Error("patient not found");
    } 
    res.status(200).json(patient)
});

const updatePatient = asyncHandler(  async ( req, res)=> {
    const patient = await Patient.findById(req.params.id, req.body);
    if(!patient){
        res.status(404);
        throw new Error("patient not found");
    }
    res.status(201).json(patient)
});

const deletePatient = asyncHandler( async ( req, res)=> {
    const record =  await  service.deleteEmployebyId(req.params.id);
    if (!record)
        res.status(404).json('no patient record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getPatient, getPatients, createPatient, updatePatient,
    deletePatient}