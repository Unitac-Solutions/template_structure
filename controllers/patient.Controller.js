const express = require("express");
const asyncHandler = require("express-async-handler")

const Patient = require('../models/patient.Model');

//________________________________________________________________________________________________
const getPatients = asyncHandler( async ( req, res) => {
    const [patients] = await Patient.getPatients()
    res.status(200).json(patients)
});

//________________________________________________________________________________________________
const getPatient = asyncHandler( async ( req, res) => {
    const [patient] = await Patient.getPatient(req.params.id);
    if(!patient ){
        res.status(404).json({message: "patient not found"})
        //throw new Error("patient not found");
    }else{
        res.status(200).json(patient);
    }
});

//________________________________________________________________________________________________
const createPatient = asyncHandler(  async ( req, res) => {
   console.log(req.body)
    const {last_name, first_name, Initials, age, gender, race, triage_id, med_aid_id,userInfo} = req.body;
      if (!last_name || !first_name || !Initials || !age || !gender ||!race || !med_aid_id||!triage_id||!userInfo) {
        res.status(400);
        throw new Error("All fields are required. !");
    }else{
        await  Patient.createPatient(req.body);
        res.status(201).send( "Created Succesfully.");
    }
});

//________________________________________________________________________________________________
const updatePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.updatePatient(req.body, req.params.id);
    if (!patient) {
      res.status(404).json({message: "Patient not found"});
      throw new Error("Patient not found");
    } else {
      res.status(200).json(patient);
    }
});

//________________________________________________________________________________________________
const deletePatient = asyncHandler( async ( req, res)=> {
    const record =  await  Patient.deletePatient(req.params.id);
    if (!record){
        res.status(404).json('no patient record found with given id :'+ req.params.id);
    }else{
        res.status(200).send("Deleted Succesfully.");
    }
});

module.exports = {getPatient, getPatients, createPatient, updatePatient, deletePatient}
