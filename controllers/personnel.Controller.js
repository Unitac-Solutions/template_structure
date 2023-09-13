const asyncHandler = require("express-async-handler")
const Personnel = require("../models/personnel.Model")

const getpersonnels = asyncHandler( async ( req, res) => {
    const [personnels] = await Personnel.getpersonnels()
    if(!personnels){   
        res.status(404).json({message: 'Personel Records not found'});
    }else{
        res.status(200).json(personnels);
    }
});

const createpersonnel = asyncHandler(  async ( req, res)=> {
    const {personnelId,first_name,last_name,occupation} = req.body;
    if (!personnelId || !first_name || !last_name || !occupation) {
        res.status(400).json({message: 'All fields are required. !'});
    }else{
        await  Personnel.createpersonnel(req.body);
        res.status(201).json( {message: 'Created Succesfully.'});
    }
});

const getpersonnel = asyncHandler( async ( req, res) => {
    const [personnel] = await Personnel.getpersonnel(req.params.id);
    if(!personnel ){
        res.status(404).json({message: 'personnel not found'});
    }else{
        res.status(200).json(personnel);
    } 
});

const updatepersonnel = asyncHandler(  async ( req, res)=> {
    const personnel = await Personnel.updatepersonnel(req.body, req.params.id);
    if(!personnel){
        res.status(404).json({message:'personnel not found'});
    }else{
        res.status(201).json(personnel);
    }
});

const deletepersonnel = asyncHandler( async ( req, res)=> {
    const record =  await  Personnel.deletepersonnel(req.params.id);
    if (!record){
        res.status(404).json({message:'no personnel record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getpersonnel, getpersonnels, createpersonnel, updatepersonnel, deletepersonnel}