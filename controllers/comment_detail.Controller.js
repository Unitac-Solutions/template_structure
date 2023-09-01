const express = require("express");
const asyncHandler = require("express-async-handler")

const Comment_detail = require("../services/comment_detail.service")

const getcomment_details = asyncHandler( async ( req, res) => {
    const [comment_details] = await Comment_detail.getcomment_details()
    if(!comment_details){
        res.status(404).json({message: "comments not found"})
    }else{
        res.status(200).json(comment_details)
    }
});

const createcomment_detail = asyncHandler(  async ( req, res)=> {
    const {comment} = req.body;
    if(!comment){
        res.status(400).json({message:"All fields are required. !"});
        //throw new Error("All fields are required. !"); 
    }else{
        await  Comment_detail.createcomment_detail(req.body);
        res.status(201).send( "Created Succesfully.")
    }
        
});

const getcomment_detail = asyncHandler( async ( req, res) => {
    const [comment_detail] = await Comment_detail.getcomment_detail(req.params.id);
    if(!comment_detail ){
        res.status(404);
        throw new Error("comment_detail not found");
    } 
    res.status(200).json(comment_detail)
});

const updatecomment_detail = asyncHandler(  async ( req, res)=> {
    const comment_detail = await Comment_detail.updatecomment_detail(req.body, req.params.id);
    if(!comment_detail){
        res.status(404);
        throw new Error("comment_detail not found");
    }
    res.status(201).json(comment_detail)
});

const deletecomment_detail = asyncHandler( async ( req, res)=> {
    const record =  await  Comment_detail.deletecomment_detail(req.params.id);
    if (!record)
        res.status(404).json('no comment_detail record found with given id :'+ req.params.id)
    else
     res.status(201).send("Deleted Succesfully.");
});

module.exports = {getcomment_detail, getcomment_details, createcomment_detail, updatecomment_detail, deletecomment_detail}
