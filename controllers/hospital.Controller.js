const asyncHandler = require("express-async-handler")

const Hospital = require('../models/hospital.Model');

///________________________________________________________________________________________________
const getHospitals = asyncHandler( async ( req, res) => {
    const [hospitals] = await Hospital.getHospitals()
    if(!hospitals){   
        res.status(404).json({message: 'Hospitals records not found'});
    }else{
        res.status(200).json(hospitals);
    }
});

//________________________________________________________________________________________________
const getHospital = asyncHandler( async ( req, res) => {
    const [hospital] = await Hospital.getHospital(req.params.id);
    if(!hospital){
        res.status(404).json({message: "Hospital not found"})
    }else{
        res.status(200).json(hospital);
    }
});

//________________________________________________________________________________________________
const createHospital = asyncHandler(  async ( req, res) => {
    const {anticipated_care_id, comment_detail_id, personel_id, handover_id } = req.body;
    if (!anticipated_care_id|| !comment_detail_id|| !personel_id|| !handover_id) {
        res.status(400).json({message:'All fields are required. !'});
    }else{
        await  Hospital.createHospital(req.body);
        res.status(201).json( {message:'Created Succesfully.'});
    }
});

//________________________________________________________________________________________________CURRENTLY NOT IN USE
const updateHospital = asyncHandler(async (req, res) => {
    const hospital = await Hospital.updateHospital(req.body, req.params.id);
    if (!hospital) {
        res.status(404).json({message: "Hospital not found"});
    } else {
        res.status(200).json(hospital);
    }
});

//________________________________________________________________________________________________
const deleteHospital = asyncHandler( async ( req, res)=> {
    const record =  await  Hospital.deleteHospital(req.params.id);
    if (!record){
        res.status(404).json({message:'no Hospital record found with given id :'+ req.params.id});
    }else{
        res.status(200).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getHospital, getHospitals, createHospital, updateHospital, deleteHospital}
