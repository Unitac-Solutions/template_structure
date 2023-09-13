const express = require("express");
const asyncHandler = require("express-async-handler")

const Patient_case = require("../models/patientCase.Model")

const getpatient_cases = asyncHandler( async ( req, res) => {
    const [patient_cases] = await Patient_case.getCases()
    res.status(200).json(patient_cases)
});

const createpatient_case = asyncHandler(  async ( req, res)=> {
    const {open_case,userInfo} = req.body;
    if (!open_case||!userInfo) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Patient_case.createCase(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getpatient_case = asyncHandler( async ( req, res) => {
    console.log(req.params.id)
    const [patient_case] = await Patient_case.getCase(req.params.id);
    if(!patient_case ){
        res.status(404);
        throw new Error("patient_case not found");
    } 
    res.status(200).json(patient_case)
});

const updatepatient_case = asyncHandler(  async ( req, res)=> {
    const patient_case = await Patient_case.updateCase(req.body, req.params.id);
    if(!patient_case){
        res.status(404);
        throw new Error("patient_case not found");
    }
    res.status(201).json(patient_case)
});

const deletepatient_case = asyncHandler( async ( req, res)=> {
    const record =  await  Patient_case.deleteCase(req.params.id);
    if (!record)
        res.status(404).json('no patient_case record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getpatient_case, getpatient_cases, createpatient_case, updatepatient_case, deletepatient_case}