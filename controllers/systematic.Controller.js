const express = require("express");
const asyncHandler = require("express-async-handler")

const Systematic = require("../services/systematic.service")

const getsystematics = asyncHandler( async ( req, res) => {
    const systematics = await Systematic.getsystematics()
    res.status(200).json(systematics)
});

const createsystematic = asyncHandler(  async ( req, res)=> {
    const {cns, cvs, abd, resp, headneck, msk} = req.body;
    if (!cns|| !cvs|| !abd|| !resp|| !headneck|| !msk) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Systematic.createsystematic(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getsystematic = asyncHandler( async ( req, res) => {
    const systematic = await Systematic.getsystematic(req.params.id);
    if(!systematic ){
        res.status(404);
        throw new Error("systematic not found");
    } 
    res.status(200).json(systematic)
});

const updatesystematic = asyncHandler(  async ( req, res)=> {
    const systematic = await Systematic.updatesystematic(req.body, req.params.id);
    if(!systematic){
        res.status(404);
        throw new Error("systematic not found");
    }
    res.status(201).json(systematic)
});

const deletesystematic = asyncHandler( async ( req, res)=> {
    const record =  await  Systematic.deletesystematic(req.params.id);
    if (!record)
        res.status(404).json('no systematic record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getsystematic, getsystematics, createsystematic, updatesystematic, deletesystematic}