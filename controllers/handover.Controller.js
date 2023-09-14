const asyncHandler = require("express-async-handler")

const Handover = require("../models/handover.Model")

const gethandovers = asyncHandler( async ( req, res) => {
    const handovers = await Handover.gethandovers()
    if(!handovers){   
        res.status(404).json({message: 'handovers records not found'});
    }else{
        res.status(200).json(handovers);
    }
});

const createhandover = asyncHandler(  async ( req, res)=> {
    const {handover_by, handover_to, handover_title, handover_name, handover_mp_no, handover_signature, hand_signature2,userInfo} = req.body;
    if (!handover_by|| !handover_to|| !handover_title|| !handover_name|| !handover_mp_no|| !handover_signature|| !hand_signature2||!userInfo) {
        res.status(400).json({message:'All fields are required. !'});
    }else{
        await  Handover.createhandover(req.body);
        res.status(201).json({message: 'Created Succesfully.'});
    }
});

const gethandover = asyncHandler( async ( req, res) => {
    const [handover] = await Handover.gethandover(req.params.id);
    if(!handover ){
        res.status(404).json({message: 'handover not found'});
    }else{
        res.status(200).json(handover);
    } 
});

const updatehandover = asyncHandler(  async ( req, res)=> {
    const handover = await Handover.updatehandover(req.body, req.params.id);
    if(!handover){
        res.status(404).json({message: 'handover not found'});
    }else{
        res.status(201).json(handover);
    }
});

const deletehandover = asyncHandler( async ( req, res)=> {
    const record =  await  Handover.deletehandover(req.params.id);
    if (!record){
        res.status(404).json({message:'no handover record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message: 'Deleted Succesfully.'});
    }
});

module.exports = {gethandover, gethandovers, createhandover, updatehandover, deletehandover}