const asyncHandler = require("express-async-handler")

const Medical_aid = require("../models/medicalAid.Model")

const getmedical_aids = asyncHandler( async ( req, res) => {
    const medical_aids = await Medical_aid.getmedical_aids()
    if(!medical_aids){   
        res.status(404).json({message: 'Medical Aids records not found'});
    }else{
        res.status(200).json(medical_aids);
    }
});

const createmedical_aid = asyncHandler(  async ( req, res)=> {
    const {provider, name, med_aid_option, number, dept_code, main_member, auth_number, next_of_kin_name, next_of_kin_contact, next_of_kin_relationship,userInfo} = req.body;
    if (!provider || !name|| !med_aid_option|| !number|| !dept_code|| !main_member|| !auth_number|| !next_of_kin_name|| !next_of_kin_contact|| !next_of_kin_relationship||!userInfo) {
       res.status(400).json({message: 'All fields are required. !'});
    }else{
        await Medical_aid.createmedical_aid(req.body);
        res.status(201).json({message:'Created Succesfully.'});
    }
});

const getmedical_aid = asyncHandler( async ( req, res) => {
    const [medical_aid] = await Medical_aid.getmedical_aid(req.params.id);
    if(!medical_aid ){
        res.status(404).json({message: 'medical_aid not found'});
    }else{
        res.status(200).json(medical_aid);
    } 
});

const updatemedical_aid = asyncHandler(  async ( req, res)=> {
    const medical_aid = await Medical_aid.updatemedical_aid(req.body, req.params.id);
    if(!medical_aid){
        res.status(404).json({message: 'medical_aid not found'});
    }else{
        res.status(201).json(medical_aid);
    }
});

const deletemedical_aid = asyncHandler( async ( req, res)=> {
    const record =  await  Medical_aid.deletemedical_aid(req.params.id);
    if(!record){
        res.status(404).json({ message: 'no medical_aid record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message:'Deleted Succesfully.'});
    }
});

module.exports = {getmedical_aid, getmedical_aids, createmedical_aid, updatemedical_aid, deletemedical_aid}