const asyncHandler = require("express-async-handler")

const Systematic = require("../models/systematic.Model")

const getsystematics = asyncHandler( async ( req, res) => {
    const systematics = await Systematic.getsystematics()
    if(!systematics){   
        res.status(404).json({message: 'Systematics records not found'});
    }else{
        res.status(200).json(systematics);
    }
});

const createsystematic = asyncHandler(  async ( req, res)=> {
    const {cns, cvs, abd, resp, headneck, msk,userInfo} = req.body;
    if (!cns|| !cvs|| !abd|| !resp|| !headneck|| !msk||!userInfo) {
     res.status(400).json({message: 'All fields are required. !'});
    }else{
        await  Systematic.createsystematic(req.body);
        res.status(201).json( {message: 'Created Succesfully.'});
    }
});

const getsystematic = asyncHandler( async ( req, res) => {
    const [systematic] = await Systematic.getsystematic(req.params.id);
    if(!systematic ){
        res.status(404).json({message: 'systematic not found'});
    }else{
        res.status(200).json(systematic);
    }
});

const updatesystematic = asyncHandler(  async ( req, res)=> {
    const systematic = await Systematic.updatesystematic(req.body, req.params.id);
    if(!systematic){
        res.status(404).json({message: 'systematic not found'});
    }else{
        res.status(201).json(systematic);
    }
});

const deletesystematic = asyncHandler( async ( req, res)=> {
    const record =  await  Systematic.deletesystematic(req.params.id);
    if (!record){
        res.status(404).json({message: 'no systematic record found with given id :'+ req.params.id});
    }else{
        res.status(201).json({message: 'Deleted Succesfully.'});
    }
});

module.exports = {getsystematic, getsystematics, createsystematic, updatesystematic, deletesystematic}