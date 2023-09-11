const express = require("express");
const asyncHandler = require("express-async-handler")

const General_examination = require("../models/generalExamination.Model")

const getgeneral_examinations = asyncHandler( async ( req, res) => {
    const general_examinations = await General_examination.getgeneral_examinations()
    res.status(200).json(general_examinations)
});

const creategeneral_examination = asyncHandler(  async ( req, res)=> {
    const {motor, verbal, eye, pupil, equal, reaction, dehydrated, bleeding, estimated_blood_loss, urine_losses, ng_losses, cd_loses} = req.body;
    if (!motor|| !verbal|| !eye|| !pupil|| !equal|| !reaction|| !dehydrated|| !bleeding|| !estimated_blood_loss|| !urine_losses|| !ng_losses|| !cd_loses) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  General_examination.creategeneral_examination(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getgeneral_examination = asyncHandler( async ( req, res) => {
    const [general_examination] = await General_examination.getgeneral_examination(req.params.id);
    if(!general_examination ){
        res.status(404);
        throw new Error("general_examination not found");
    } 
    res.status(200).json(general_examination)
});

const updategeneral_examination = asyncHandler(  async ( req, res)=> {
    const [general_examination] = await General_examination.updategeneral_examination(req.body, req.params.id);
    if(!general_examination){
        res.status(404);
        throw new Error("general_examination not found");
    }
    res.status(201).json(general_examination)
});

const deletegeneral_examination = asyncHandler( async ( req, res)=> {
    const record =  await  General_examination.deletegeneral_examination(req.params.id);
    if (!record)
        res.status(404).json('no general_examination record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getgeneral_examination, getgeneral_examinations, creategeneral_examination, updategeneral_examination, deletegeneral_examination}