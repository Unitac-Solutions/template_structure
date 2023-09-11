const express = require("express");
const asyncHandler = require("express-async-handler")

const Incident = require("../models/incident.Model")

const getincidents = asyncHandler( async ( req, res) => {
    const [incidents] = await Incident.getincidents()
    res.status(200).json(incidents)
});

const createincident = asyncHandler(  async ( req, res)=> {
    const {trauma, location, dispatch_priority, trauma_specification, medical, medical_specification} = req.body;
    if (!trauma|| !location|| !dispatch_priority|| !trauma_specification|| !medical|| !medical_specification) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Incident.createincident(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getincident = asyncHandler( async ( req, res) => {
    const [incident] = await Incident.getincident(req.params.id);
    if(!incident ){
        res.status(404).json({message:"incident not found"});
    } 
    res.status(200).json(incident)
});

const updateincident = asyncHandler(  async ( req, res)=> {
    const incident = await Incident.updateincident(req.body, req.params.id);
    if(!incident){
        res.status(404);
        throw new Error("incident not found");
    }
    res.status(201).json(incident)
});

const deleteincident = asyncHandler( async ( req, res)=> {
    const record =  await  Incident.deleteincident(req.params.id);
    if (!record)
        res.status(404).json('no incident record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getincident, getincidents, createincident, updateincident, deleteincident}