//const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler")
const Patient = require("../models/patient.Model")

//@desc Get all patients
//@route GET /api/patients
//@access private
const getPatients = asyncHandler( async ( req, res) => {
    const patients = await Patient.find({user_id: req.user_id});
    res.status(200).json(patients)
});

const createPatient = asyncHandler(  async ( req, res)=> {
    console.log("The request body is :", req.body);
    const {name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
    const patient = await Patient.create({
        name, email, phone, user_id: req.user_id
    })
    res.status(201).json(patient)
});

const getPatient = asyncHandler( async ( req, res) => {
    const patient = await Patient.findById(req.params.id);
    if(!patient ){
        res.status(404);
        throw new Error("patient not found");
    } 
    res.status(200).json(patient)
});

const updatePatient = asyncHandler(  async ( req, res)=> {
    const patient = await Patient.findById(req.params.id);
    if(!patient){
        res.status(404);
        throw new Error("patient not found");
    }
    if (patient.user_id.toString() !== req.user_id) {
        res.status(403);
        throw new Error("Do not have permisiions to update other patients");
    }
    const updatedpatient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(201).json(updatedpatient)
});

const deletePatient = asyncHandler( async ( req, res)=> {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("patient not found");
    }
    if (patient.user_id.toString() !== req.user_id) {
        res.status(403);
        throw new Error("Do not have permisiions to delete other patients");
    }
    await Patient.deleteOne({_id: req.params.id});
    res.status(200).json(patient);
});

module.exports = {getPatient, getPatients, createPatient,
    updatePatient, deletePatient}