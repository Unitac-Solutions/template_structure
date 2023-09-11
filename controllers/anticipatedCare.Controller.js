const express = require("express");
const asyncHandler = require("express-async-handler");

const AnticipatedCare = require("../models/anticipatedCare.Model");

const getAnticipatedCares = asyncHandler( async ( req, res) => {
    const [anticipatedCare] = await AnticipatedCare.getAnticipatedCares()
    res.status(200).json(anticipatedCare)
});

const createAnticipatedCare = asyncHandler(  async ( req, res)=> {
    const {anticipated_specialist_id, airway_and_breathing, circulation, drugs, airway_and_breathing_specify, circulation_specify, drugs_specify} = req.body;
    if (!anticipated_specialist_id || !airway_and_breathing || !circulation || !drugs || !airway_and_breathing_specify || !circulation_specify ||!drugs_specify) {
        res.status(400);
        throw new Error("All fields are required. !");
    }else{
        await  AnticipatedCare.createAnticipatedCare(req.body);
        res.status(201).send( "Created Succesfully.")//create success 200 or 201
    }
});

const getAnticipatedCare = asyncHandler( async ( req, res) => {
    const [anticipatedCare] = await AnticipatedCare.getAnticipatedCare(req.params.id);
    if(!anticipatedCare){
        res.status(404);
        throw new Error("Anticipated care not found");
    } 
    res.status(200).json(anticipatedCare)
});

const updateAnticipatedCare = asyncHandler(  async ( req, res)=> {
    const [anticipatedCare] = await AnticipatedCare.updateAnticipatedCare(req.body, req.params.id);
    if(!anticipatedCare){
        res.status(404);
        throw new Error("Anticipated care not found");
    }
    res.status(201).json(anticipatedCare)
});

const deleteAnticipatedCare = asyncHandler( async ( req, res)=> {
    const delRecord =  await  AnticipatedCare.deleteAnticipatedCare(req.params.id);
    if (!delRecord)
        res.status(404).json('no Anticipated Care record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getAnticipatedCares,getAnticipatedCare, updateAnticipatedCare, deleteAnticipatedCare, createAnticipatedCare}

