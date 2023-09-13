const express = require("express");
const asyncHandler = require("express-async-handler")
const Specialist = require("../models/anticipatedSpecialist.Model")

const getspecialists = asyncHandler( async ( req, res) => {
    const [specialists] = await Specialist.getSpecialists()
    if(!specialists){
        res.status(404).json({message: "Specialists not found"})
    }else{
        res.status(200).json(specialists)
    }
});

const createspecialist = asyncHandler(  async ( req, res)=> {
    const {anticipated_specialist, anticipated_surgeon, anticipated_surgeon_specify, anticipated_specialist_specify} = req.body;
    if (!anticipated_specialist || !anticipated_surgeon || !anticipated_surgeon_specify || !anticipated_specialist_specify) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Specialist.createSpecialist(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getspecialist = asyncHandler( async ( req, res) => {
    const [specialist] = await Specialist.getSpecialist(req.params.id);
    if(!specialist ){
        res.status(404);
        throw new Error("specialist not found");
    } 
    res.status(200).json(specialist)
});

const updatespecialist = asyncHandler(  async ( req, res)=> {
    const specialist = await Specialist.updateSpecialist(req.body, req.params.id);
    if(!specialist){
        res.status(404);
        throw new Error("specialist not found");
    }
    res.status(201).json(specialist)
});

const deletespecialist = asyncHandler( async ( req, res)=> {
    const record =  await  Specialist.deleteSpecialist(req.params.id);
    if (!record)
        res.status(404).json('no specialist record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getspecialist, getspecialists, createspecialist, updatespecialist, deletespecialist}