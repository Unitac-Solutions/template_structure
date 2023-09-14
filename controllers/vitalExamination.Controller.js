const asyncHandler = require("express-async-handler")

const Vital_examination = require("../models/vitalEximination.Model")

const getvital_examinations = asyncHandler( async ( req, res) => {
    const vital_examinations = await Vital_examination.getvital_examinations()
    
    if(!vital_examinations){   
        res.status(404).json({message: 'Vital Examination Not found'});
    }else{
        res.status(200).json(vital_examinations);
    }
});

const createvital_examination = asyncHandler(  async ( req, res)=> {
    const {respiritory_rate, respiritory_rhythm, respiritory_depth, respiritory_symmetry, respiritory_saO2, pulse_rate, pulse_rhythm, pulse_volume, skin_colour, skin_moisture, Skin_temperature, skin_cap_refill, blood_pressure, hgt,userInfo} = req.body;
    if (!respiritory_rate|| !respiritory_rhythm|| !respiritory_depth|| !respiritory_symmetry|| !respiritory_saO2|| !pulse_rate|| !pulse_rhythm|| !pulse_volume|| !skin_colour|| !skin_moisture|| !Skin_temperature|| !skin_cap_refill|| !blood_pressure|| !hgt||!userInfo) {
       res.status(400).json({message: 'All fields are required. !'});
    }else{
        await  Vital_examination.createvital_examination(req.body);
        res.status(201).json( {message: 'Created Succesfully.'});
    }
});

const getvital_examination = asyncHandler( async ( req, res) => {
    const [vital_examination] = await Vital_examination.getvital_examination(req.params.id);
    if(!vital_examination ){
        res.status(404).json({message: 'vital_examination not found'});
    }else{
        res.status(200).json(vital_examination);
    }
});

const updatevital_examination = asyncHandler(  async ( req, res)=> {
    const  vital_examination = await Vital_examination.updatevital_examination(req.body, req.params.id);
    if(!vital_examination){
        res.status(404).json({message: 'vital_examination not found'});
    }else{
        res.status(201).json(vital_examination);
    }
});

const deletevital_examination = asyncHandler( async ( req, res)=> {
    const record =  await  Vital_examination.deletevital_examination(req.params.id);
    if (!record){
        res.status(404).json({message:'no vital_examination record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getvital_examination, getvital_examinations, createvital_examination, updatevital_examination, deletevital_examination}