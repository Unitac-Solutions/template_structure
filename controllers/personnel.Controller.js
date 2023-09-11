const asyncHandler = require("express-async-handler")
const Personnel = require("../models/personnel.Model")

const getpersonnels = asyncHandler( async ( req, res) => {
    const [personnels] = await Personnel.getpersonnels()
    res.status(200).json(personnels)
});

const createpersonnel = asyncHandler(  async ( req, res)=> {
    const {last_name, first_name, initials, age, gender, race } = req.body;
    if (!last_name || !first_name || !initials || !age || !gender ||!race) {
        res.status(400);
        throw new Error("All fields are required. !");
    }
        await  Personnel.createpersonnel(req.body);
        res.status(201).send( "Created Succesfully.")
});

const getpersonnel = asyncHandler( async ( req, res) => {
    const [personnel] = await Personnel.getpersonnel(req.params.id);
    if(!personnel ){
        res.status(404);
        throw new Error("personnel not found");
    } 
    res.status(200).json(personnel)
});

const updatepersonnel = asyncHandler(  async ( req, res)=> {
    const personnel = await Personnel.updatepersonnel(req.body, req.params.id);
    if(!personnel){
        res.status(404);
        throw new Error("personnel not found");
    }
    res.status(201).json(personnel)
});

const deletepersonnel = asyncHandler( async ( req, res)=> {
    const record =  await  Personnel.deletepersonnel(req.params.id);
    if (!record)
        res.status(404).json('no personnel record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getpersonnel, getpersonnels, createpersonnel, updatepersonnel, deletepersonnel}