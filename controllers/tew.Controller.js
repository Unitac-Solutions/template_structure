const asyncHandler = require("express-async-handler")

const Tew = require("../models/tew.Model")

const gettews = asyncHandler( async ( req, res) => {
    const tews = await Tew.gettews()
    if(!tews){   
        res.status(404).json({message: 'Tews records not found'});
    }else{
        res.status(200).json(tews);
    }
});

const createtew = asyncHandler(  async ( req, res)=> {
    const {emergency, very_urgent, urgent, mobility, rr, hr, temp, avpu, trauma, sbp, walking, breathing, respiratory, pulse} = req.body;
    if (!emergency || !very_urgent|| !urgent|| !mobility|| !rr|| !hr|| !temp|| !avpu|| !trauma|| !sbp|| !walking|| !breathing|| !respiratory|| !pulse) {
        res.status(400).json({message: 'All fields are required. !'});
    }else{
        await  Tew.createtew(req.body);
        res.status(201).json({message:'Created Succesfully.'});
    }
});

const gettew = asyncHandler( async ( req, res) => {
    const [tew] = await Tew.gettew(req.params.id);
    if(!tew ){
        res.status(404).json({message: 'tew not found'});
    }else{
        res.status(200).json(tew);
    }
});

const updatetew = asyncHandler(  async ( req, res)=> {
    const tew = await Tew.updatetew(req.body, req.params.id);
    if(!tew){
        res.status(404).json({message: 'tew not found'});
    }else{
        res.status(201).json(tew);
    }
});

const deletetew = asyncHandler( async ( req, res)=> {
    const record =  await  Tew.deletetew(req.params.id);
    if (!record){
        res.status(404).json({message: 'no tew record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message: 'Deleted Succesfully.'});
    }
});

module.exports = {gettew, gettews, createtew, updatetew, deletetew}