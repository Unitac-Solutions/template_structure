const express = require("express");
const asyncHandler = require("express-async-handler")

const Hospital = require('../services/hospital_service');

//________________________________________________________________________________________________
const getHospitals = asyncHandler( async ( req, res) => {
    const [hospitals] = await Hospital.getHospitals()
    res.status(200).json(hospitals)
});

//________________________________________________________________________________________________
const getHospital = asyncHandler( async ( req, res) => {
    const [hospital] = await Hospital.getHospital(req.params.id);
    if(!hospital ){
        res.status(404).json({message: "Hospital not found"})
        //throw new Error("Hospital not found");
    }else{
        res.status(200).json(hospital);
    }
});

//________________________________________________________________________________________________
const createHospital = asyncHandler(  async ( req, res) => {
    const {anticipated_care_id, comment_detail_id, personel_id, handover_id } = req.body;
    if (!anticipated_care_id|| !comment_detail_id|| !personel_id|| !handover_id) {
        res.status(400);
        throw new Error("All fields are required. !");
    }else{
        await  Hospital.createHospital(req.body);
        res.status(201).send( "Created Succesfully.");
    }
});

//________________________________________________________________________________________________CURRENTLY NOT IN USE
const updateHospital = asyncHandler(async (req, res) => {
    const hospital = await Hospital.updateHospital(req.body, req.params.id);
    if (!hospital) {
      res.status(404).json({message: "Hospital not found"});
      //throw new Error("Hospital not found");
    } else {
      res.status(200).json(hospital);
    }
});

//________________________________________________________________________________________________
const deleteHospital = asyncHandler( async ( req, res)=> {
    const record =  await  Hospital.deleteHospital(req.params.id);
    if (!record){
        res.status(404).json('no Hospital record found with given id :'+ req.params.id);
    }else{
        res.status(200).send("Deleted Succesfully.");
    }
});

module.exports = {getHospital, getHospitals, createHospital, updateHospital, deleteHospital}
