const express = require("express");
const asyncHandler = require("express-async-handler");
const UserService = require("../models/user.model"); 
const { genSaltSync , hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
 

//const router = express.Router();

const getUsers = asyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers();
  if (!users) {
    res.status(404);
    throw new Error("Users not found");
  }
  res.status(200).json(users);
});


const Logout =  (  (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.json({Status:"Success"})
});


const createUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    phone_number,
    work_number,
    role,
    paramedic_id,
    type,
    email,
    password 
  } = req.body;
    // console.log(req.body)
  if (
    !first_name ||
    !last_name ||
    !phone_number ||
    !work_number ||
    !role ||
    !paramedic_id ||
    !type ||
    !email ||
    !password  
  ) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const salt = genSaltSync(10);
  const HashedPassword = hashSync(password, salt);

  const user = await UserService.createUser({
    first_name,
    last_name,
    phone_number,
    work_number,
    role,
    paramedic_id,
    type,
    email,
    HashedPassword
  });

  if (user.error) {
    res.status(201).json("user alreaady exist");
  } else {
    res.status(201).json("user  created successfuly");
  }
});


const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await UserService.getUser(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  console.log(req.body)
  const {
    first_name,
    last_name,
    phone_number,
    work_number,
    role,
    type,
    userInfo
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !phone_number ||
    !work_number ||
    !role ||
    !type  
  ) {
    res.status(400);
    throw new Error("All fields are required!");
  } 
 
  const updateAdUser = await UserService.updateUser(
    {
      first_name,
      last_name,
      phone_number,
      work_number,
      role,
 
      type,
 
      userInfo
    },
    userId
  );
  res.status(201).json(updateAdUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const deletedCount = await UserService.deleteUser(userId);

  if (!deletedCount) {
    res.status(404);
    throw new Error(`User with ID ${userId} not found.`);
  }

  res.status(200).send("User Deleted Successfully.");
});
const login = asyncHandler(async (req, res) => {
  const body = req.body;

  try {
    const logUser = await UserService.getUserByEmail(body.email);

    if (!logUser) {
      return res.status(401).json({
        success: 0,
        message: "Invalid login details",
      });
    }

    const isPasswordValid = compareSync(body.password, logUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: 0,
        message: "Invalid login details",
      });
    }

    const userWithoutPassword = { ...logUser, password: undefined };
    const accessToken = sign(
      { result: userWithoutPassword },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = sign(
      { userId: userWithoutPassword._id },
      process.env.TOKEN_KEY2,
      {
        expiresIn: "1d", // Set an appropriate expiration for refresh tokens
      }
    );
 
    res.cookie('accessToken', accessToken, { httpOnly: false,  sameSite: 'None', secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });
 
 
    return res.status(200).json({
      islogged: true,
      first_name: userWithoutPassword.first_name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: 0,
      message: "Internal server error",
    });
  }
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ success: 0, message: 'Refresh token missing.' });
  }

  verify(refreshToken, process.env.TOKEN_KEY2, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: 0, message: 'Invalid refresh token.' });
    }

    const accessToken = sign({ userId: decoded.userId }, process.env.TOKEN_KEY, { expiresIn: '1h' });
    return res.status(200).json({ userLog: true });
  });
});


const checkUser =  ( (req, res) => {
 
  return res.json({Status:"Success", Name:req.name, message:"Authorized", type:req.type,id:req.user_id})
});


module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login,
  refresh,
  checkUser,
  Logout
};
