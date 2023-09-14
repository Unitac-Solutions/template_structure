const asyncHandler = require("express-async-handler")
const Specialist = require("../models/anticipatedSpecialist.Model")

const getspecialists = asyncHandler( async ( req, res) => {
    const specialists = await Specialist.getSpecialists()
    
    if(!specialists){
        res.status(404).json({ message: 'Specialists records not found'});
    }else{
        res.status(200).json(specialists);    
    }
});

const createspecialist = asyncHandler(  async ( req, res)=> {
    const {anticipated_specialist, anticipated_surgeon, anticipated_surgeon_specify, anticipated_specialist_specify,userInfo} = req.body;
    if (!anticipated_specialist || !anticipated_surgeon || !anticipated_surgeon_specify || !anticipated_specialist_specify||!userInfo) {
        res.status(400).json({message: 'All fields are required!'});
    }else{
        await  Specialist.createSpecialist(req.body);
        res.status(201).json({message: 'Created Succesfully.'});
    }
});

const getspecialist = asyncHandler( async ( req, res) => {
    const [specialist] = await Specialist.getSpecialist(req.params.id);
    if(!specialist ){
        res.status(404).json({message: 'Specialist not found'});
    }else{
        res.status(200).json(specialist);
    }
});

const updatespecialist = asyncHandler(  async ( req, res)=> {
    const specialist = await Specialist.updateSpecialist(req.body, req.params.id);
    if(!specialist){
        res.status(404).json({message: 'specialist not found'});
    }else{
        res.status(201).json(specialist);
    }
});

const deletespecialist = asyncHandler( async ( req, res)=> {
    const record =  await  Specialist.deleteSpecialist(req.params.id);
    if (!record){
        res.status(404).json({message: 'no specialist record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getspecialist, getspecialists, createspecialist, updatespecialist, deletespecialist}