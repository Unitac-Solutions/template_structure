const express = require("express");
const asyncHandler = require("express-async-handler")

const Clinical_history = require("../models/clinicalHistory.Model")

const getclinical_historys = asyncHandler( async ( req, res) => {
    const clinical_historys = await Clinical_history.getclinical_historys()
    res.status(200).json(clinical_historys)
});

const createclinical_history = asyncHandler(  async ( req, res)=> {
    const {history, med_condition, medication, surgery, allergy,userInfo} = req.body;
    if (!history|| !med_condition|| !medication|| !surgery|| !allergy||!userInfo) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Clinical_history.createclinical_history(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getclinical_history = asyncHandler( async ( req, res) => {
    const [clinical_history] = await Clinical_history.getclinical_history(req.params.id);
    if(!clinical_history ){
        res.status(404);
        throw new Error("clinical_history not found");
    } 
    res.status(200).json(clinical_history)
});

const updateclinical_history = asyncHandler( async ( req, res)=> {

    const clinical_history = await Clinical_history.updateclinical_history(req.body, req.params.id);
    if(!clinical_history){
        res.status(404);
        throw new Error("clinical_history not found");
    }

    res.status(200).json(clinical_history)
});

const deleteclinical_history = asyncHandler( async ( req, res)=> {
    const record =  await  Clinical_history.deleteclinical_history(req.params.id);
    if (!record)
        res.status(404).json('no clinical_history record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getclinical_history, getclinical_historys, createclinical_history, updateclinical_history, deleteclinical_history}