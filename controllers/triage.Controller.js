const asyncHandler = require("express-async-handler")

const Triage = require("../models/triage.Model")

const getTriages = asyncHandler( async ( req, res) => {
    const triages = await Triage.getTriages()
    if(!triages){   
        res.status(404).json({message: 'Triages records not found'});
    }else{
        res.status(200).json(triages);
    }
});

const createTriage = asyncHandler(  async ( req, res)=> {
    const {user_type, branch, username, email, user_reg, street_name, city_town, province, postal_code,userInfo} = req.body;
    if (!user_type || !branch || !username || !email || !user_reg || !street_name || !city_town || !province || !postal_code||!userInfo) {
        res.status(400).json({message: 'All fields are required. !'});
    }else{
        await  Triage.createTriage(req.body);
        res.status(201).json({message: 'Created Succesfully.'});
    }
});

const getTriage = asyncHandler( async ( req, res) => {
    const [triage] = await Triage.getTriage(req.params.id);
    if(!triage){
        res.status(404).json({message: 'triage not found'});
    }else{
        res.status(200).json(triage);
    } 
});

const updateTriage = asyncHandler(  async ( req, res)=> {
    const triage = await Triage.updateTriage(req.body, req.params.id);
    if(!triage){
        res.status(404).json({message: 'triage not found'});
    }else{
        res.status(201).json(triage);
    }
});

const deleteTriage = asyncHandler( async ( req, res)=> {
    const record =  await  Triage.deleteTriage(req.params.id);
    if (!record){
        res.status(404).json({message:'no triage record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getTriages, getTriage, createTriage, updateTriage, deleteTriage}