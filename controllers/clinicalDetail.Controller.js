const express = require("express");
const asyncHandler = require("express-async-handler")

const Clinical = require('../models/clinicalDetail.Model');


const getclinicals = asyncHandler( async ( req, res) => {
    const [clinicals] = await Clinical.getClinical_details();
    res.status(200).json(clinicals)
});

 
const getclinical = asyncHandler( async ( req, res) => {
    const [clinical] = await Clinical.getClinical_detail(req.params.id);
    if(!clinical ){
        res.status(404).json({message: "clinical not found"})
        //throw new Error("clinical not found");
    }else{
        res.status(200).json(clinical);
    }
});


const createclinical = asyncHandler(  async ( req, res) => {
     // console.log(req.body)
    const {systematic_id, general_examination_id, vital_examination_id, management_id,userInfo} = req.body;
    if (!systematic_id|| !general_examination_id|| !vital_examination_id|| !management_id||!userInfo) {
        res.status(400);
        throw new Error("All fields are required. !");
    }else{
        await  Clinical.createClinical_detail(req.body);
        res.status(201).send( "Created Succesfully.");
    }
});

const updateclinical = asyncHandler(async (req, res) => {

    const clinical = await Clinical.updateClinical_detail(req.body, req.params.id);
    if (!clinical) {
      res.status(404).json({message: "clinical not found"});
      //throw new Error("clinical not found");
    } else {
      res.status(200).json(clinical);
    }
});

const deleteclinical = asyncHandler( async ( req, res)=> {
 
    const record =  await  Clinical.deleteClinical_detail(req.params.id);
    if (!record){
        res.status(404).json('no clinical record found with given id :'+ req.params.id);
    }else{
        res.status(200).send("Deleted Succesfully.");
    }
});

module.exports = {getclinical, getclinicals, createclinical, updateclinical, deleteclinical}