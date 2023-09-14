const asyncHandler = require("express-async-handler")

const General_examination = require("../models/generalExamination.Model")

const getgeneral_examinations = asyncHandler( async ( req, res) => {
    const [general_examinations] = await General_examination.getgeneral_examinations()
    if(!general_examinations){   
        res.status(404).json({message: 'General Examinations records not found'});
    }else{
        res.status(200).json(general_examinations);
    }
});

const creategeneral_examination = asyncHandler(  async ( req, res)=> {
    const {motor, verbal, eye, pupil, equal, reaction, dehydrated, bleeding, estimated_blood_loss, urine_losses, ng_losses, cd_loses,userInfo} = req.body;
    if (!motor|| !verbal|| !eye|| !pupil|| !equal|| !reaction|| !dehydrated|| !bleeding|| !estimated_blood_loss|| !urine_losses|| !ng_losses|| !cd_loses||!userInfo) {
        res.status(400).json({message: 'All fields are required. !'});
    }else{
        await  General_examination.creategeneral_examination(req.body);
        res.status(201).json({message: 'Created Succesfully.'});
    }
});

const getgeneral_examination = asyncHandler( async ( req, res) => {
    const [general_examination] = await General_examination.getgeneral_examination(req.params.id);
    if(!general_examination ){
        res.status(404).json({message: 'general_examination not found'});
    }else{
        res.status(200).json(general_examination);
    }
});

const updategeneral_examination = asyncHandler(  async ( req, res)=> {
    const [general_examination] = await General_examination.updategeneral_examination(req.body, req.params.id);
    if(!general_examination){
        res.status(404).json({message: 'general_examination not found'});
    }else{
        res.status(201).json(general_examination);
    }
});

const deletegeneral_examination = asyncHandler( async ( req, res)=> {
    const record =  await  General_examination.deletegeneral_examination(req.params.id);
    if(!record){
        res.status(404).json({message: 'no general_examination record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getgeneral_examination, getgeneral_examinations, creategeneral_examination, updategeneral_examination, deletegeneral_examination}