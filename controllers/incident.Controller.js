const asyncHandler = require("express-async-handler")

const Incident = require("../models/incident.Model");
const { json } = require("body-parser");

const getincidents = asyncHandler( async ( req, res) => {
    const incidents = await Incident.getincidents()
    if(!incidents){   
        res.status(404).json({message: 'Incidents records not found'});
    }else{
        res.status(200).json(incidents);
    }
});

const createincident = asyncHandler(  async ( req, res)=> {
    const {trauma, location, dispatch_priority, trauma_specification, medical, medical_specification,userInfo} = req.body;
    if (!trauma|| !location|| !dispatch_priority|| !trauma_specification|| !medical|| !medical_specification||!userInfo) {
        res.status(400).json({message: 'All fields are required. !'});
    }else{
        await  Incident.createincident(req.body);
        res.status(201).json({message: 'Created Succesfully.'});
    }
});

const getincident = asyncHandler( async ( req, res) => {
    const [incident] = await Incident.getincident(req.params.id);
    if(!incident ){
        res.status(404).json({message:"incident not found"});
    }else{
        res.status(200).json(incident);
    } 
});

const updateincident = asyncHandler(  async ( req, res)=> {
    const incident = await Incident.updateincident(req.body, req.params.id);
    if(!incident){
        res.status(404).json({message: 'incident not found'});
    }else{
        res.status(201).json(incident);
    }
});

const deleteincident = asyncHandler( async ( req, res)=> {
    const record =  await  Incident.deleteincident(req.params.id);
    if (!record){
        res.status(404).json({message:'no incident record found with given id :'+ req.params.id})
    }else{
        res.status(201).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getincident, getincidents, createincident, updateincident, deleteincident}