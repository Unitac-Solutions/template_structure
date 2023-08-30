const express = require("express");
const asyncHandler = require("express-async-handler")

const Tew = require("../services/tew.service")

const gettews = asyncHandler( async ( req, res) => {
    const [tews] = await Tew.gettews()
    res.status(200).json(tews)
});

const createtew = asyncHandler(  async ( req, res)=> {
    const {emergency, very_urgent, urgent, mobility, rr, hr, temp, avpu, trauma, sbp, walking, breathing, respiratory, pulse} = req.body;
    if (!emergency || !very_urgent|| !urgent|| !mobility|| !rr|| !hr|| !temp|| !avpu|| !trauma|| !sbp|| !walking|| !breathing|| !respiratory|| !pulse) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Tew.createtew(req.body);
        res.status(201).send( "Created Succesfully.")
});

const gettew = asyncHandler( async ( req, res) => {
    const tew = await Tew.gettew(req.params.id);
    if(!tew ){
        res.status(404);
        throw new Error("tew not found");
    } 
    res.status(200).json(tew)
});

const updatetew = asyncHandler(  async ( req, res)=> {
    const tew = await Tew.updatetew(req.body, req.params.id);
    if(!tew){
        res.status(404);
        throw new Error("tew not found");
    }
    res.status(201).json(tew)
});

const deletetew = asyncHandler( async ( req, res)=> {
    const record =  await  Tew.deletetew(req.params.id);
    if (!record)
        res.status(404).json('no tew record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {gettew, gettews, createtew, updatetew, deletetew}