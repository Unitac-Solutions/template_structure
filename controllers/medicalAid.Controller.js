const express = require("express");
const asyncHandler = require("express-async-handler")

const Medical_aid = require("../models/medicalAid.Model")

const getmedical_aids = asyncHandler( async ( req, res) => {
    const [medical_aids] = await Medical_aid.getmedical_aids()
    res.status(200).json(medical_aids)
});

const createmedical_aid = asyncHandler(  async ( req, res)=> {
    const {provider, name, med_aid_option, number, dept_code, main_member, auth_number, next_of_kin_name, next_of_kin_contact, next_of_kin_relationship} = req.body;
    if (!provider || !name|| !med_aid_option|| !number|| !dept_code|| !main_member|| !auth_number|| !next_of_kin_name|| !next_of_kin_contact|| !next_of_kin_relationship) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        res.status(201).send( "Created Succesfully.")
});

const getmedical_aid = asyncHandler( async ( req, res) => {
    const [medical_aid] = await Medical_aid.getmedical_aid(req.params.id);
    if(!medical_aid ){
        res.status(404);
        throw new Error("medical_aid not found");
    } 
    res.status(200).json(medical_aid)
});

const updatemedical_aid = asyncHandler(  async ( req, res)=> {
    const [medical_aid] = await Medical_aid.updatemedical_aid(req.body, req.params.id);
    if(!medical_aid){
        res.status(404);
        throw new Error("medical_aid not found");
    }
    res.status(201).json(medical_aid)
});

const deletemedical_aid = asyncHandler( async ( req, res)=> {
    const record =  await  Medical_aid.deletemedical_aid(req.params.id);
    if (!record)
        res.status(404).json('no medical_aid record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getmedical_aid, getmedical_aids, createmedical_aid, updatemedical_aid, deletemedical_aid}