const asyncHandler = require("express-async-handler");
const UserService = require("../models/user.model"); 

const { genSaltSync , hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

//const router = express.Router();

const getUsers = asyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers();
  if (!users) {
    res.status(404);
    throw new Error("Users not found");
  }
  res.status(200).json(users);
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
    password,
    created_by
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !phone_number ||
    !work_number ||
    !role ||
    !paramedic_id ||
    !type ||
    !email ||
    !password ||
    !created_by
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
  }, created_by);

  if (user.error) {
    res.status(400).json({ error: user.error });
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
  console.log(req.body.userInfo )
  const {
    first_name,
    last_name,
    phone_number,
    work_number,
    role,
    paramedic_id,
    type,
    email,
    password,
    userInfo
  } = req.body;

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
 
  const updatedUser = await UserService.updateUser(
    {
      first_name,
      last_name,
      phone_number,
      work_number,
      role,
      paramedic_id,
      type,
      email,
      password,
      userInfo
    },
    userId
  );

  res.status(201).json(updatedUser);
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
    const jsontoken = sign(
      { result: userWithoutPassword },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: 1,
      message: "Login successful",
      token: jsontoken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: 0,
      message: "Internal server error",
    });
  }
});



module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login
};