const express = require("express");
const asyncHandler = require("express-async-handler")

const Triage = require("../services/triage.service")

const gettriages = asyncHandler( async ( req, res) => {
    const triages = Triage.gettriages()
    res.status(200).json(triages)
});

const createtriage = asyncHandler(  async ( req, res)=> {
    const {user_type, branch, username, email, user_reg, street_name, city_town, province, postal_code} = req.body;
    if (!user_type || !branch || !username || !email || !user_reg || !street_name || !city_town || !province || !postal_code) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Triage.createtriage(req.body);
        res.status(201).send( "Created Succesfully.")
});

const gettriage = asyncHandler( async ( req, res) => {
    const triage = await Triage.gettriage(req.params.id);
    if(!triage ){
        res.status(404);
        throw new Error("triage not found");
    } 
    res.status(200).json(triage)
});

const updatetriage = asyncHandler(  async ( req, res)=> {
    const triage = await Triage.updatetriage(req.body, req.params.id);
    if(!triage){
        res.status(404);
        throw new Error("triage not found");
    }
    res.status(201).json(triage)
});

const deletetriage = asyncHandler( async ( req, res)=> {
    const record =  await  Triage.deletetriage(req.params.id);
    if (!record)
        res.status(404).json('no triage record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {gettriage, gettriages, createtriage, updatetriage, deletetriage}