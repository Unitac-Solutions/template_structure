//const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler")
const User = require("../models/user.Model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const loginUser = asyncHandler( async ( req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are Mandantory. !");
    }
    const user = await User.findOne({email});
    //Compare password with hashed pass
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRETE, 
        {expiresIn: "30m"});
        res.status(200).json({accessToken})
    }else{
        res.status(402);
        throw new Error("email or password is not valid");
    }
});

const registerUser = asyncHandler(  async ( req, res)=> {
    console.log("The request body is :", req.body);
    const {username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are Mandantory. !");
    }
    const userAvailable = await User.findOne({email})
    if (userAvailable) {
        res.status(400);
        throw new Error("user already registered");
    }

    //Hashed password
    const hashedpassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username, email, password : hashedpassword,
    });
    if (user) {
        res.status(201).json({_id: user.id, email: user.email})  
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.status(201).json({message: "Registered user"});
});

const currentUser  = asyncHandler( async ( req, res) => {
    res.json(res.user);
});


module.exports = {loginUser, currentUser, registerUser}