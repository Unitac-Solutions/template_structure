const asyncHandler = require("express-async-handler")

const Triage = require("../models/triage.Model")

const getTriages = asyncHandler( async ( req, res) => {
    const [triages] = await Triage.getTriages()
    res.status(200).json(triages)
});

const createTriage = asyncHandler(  async ( req, res)=> {
    const {user_type, branch, username, email, user_reg, street_name, city_town, province, postal_code} = req.body;
    if (!user_type || !branch || !username || !email || !user_reg || !street_name || !city_town || !province || !postal_code) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Triage.createTriage(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getTriage = asyncHandler( async ( req, res) => {
    const [triage] = await Triage.getTriage(req.params.id);
    if(!triage ){
        res.status(404);
        throw new Error("triage not found");
    } 
    res.status(200).json(triage)
});

const updateTriage = asyncHandler(  async ( req, res)=> {
    const [triage] = await Triage.updateTriage(req.body, req.params.id);
    if(!triage){
        res.status(404);
        throw new Error("triage not found");
    }
    res.status(201).json(triage)
});

const deleteTriage = asyncHandler( async ( req, res)=> {
    const record =  await  Triage.deleteTriage(req.params.id);
    if (!record)
        res.status(404).json('no triage record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getTriages, getTriage, createTriage, updateTriage, deleteTriage}