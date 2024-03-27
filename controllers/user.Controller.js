const asyncHandler = require("express-async-handler");
const UserService = require("../services/user.model");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");

const getUsers = asyncHandler(async (req, res) => {
  const [users] = await UserService.getAllUsers();
  if (!users) {
    res.status(404);
    throw new Error("Users not found");
  }
  res.status(200).json(users);
});


const Logout = ((req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.json({ Status: "Success" })
});


const createUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    phone_number,
    email,
    password
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !phone_number ||
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
    email,
    HashedPassword
  });

  if (user.error) {
    return res.status(200).json("Email already exists");
  }

  const secret = process.env.TOKEN_KEY_VERIFY_EMAIL;
  const payload = {
    email: email
  };
  const token = sign(payload, secret);
  const link = `${process.env.ClientLink}/verify_email/${token}/update`;
  const recipient = email;
  const subject = 'Verify your Email';

  try {
    const emailSent = await UserService.sendLink(recipient, subject, link);
    if (!emailSent) {
      return res.status(500).send('Email sending failed');
    }
    return res.status(201).json("User created successfully. Please check your email to verify your account.");
  } catch (error) {
    return res.status(500).send('Email sending failed with an error.');
  }
});


const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await UserService.getUser(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json(user);
});



const getUserByAuth = asyncHandler(async (req, res) => {

  const userId = req.body.userInfo.user_id;
  const user = await UserService.getUser(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json(user);
});


const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserService.deleteUser(req.body, req.params.id)
  if (!user) {
    res.status(404).json({ message: 'User Not found' });
  } else {
    res.status(201).json({ message: 'Deleted Succesfully' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      first_name,
      last_name,
      phone_number,
      password,
      userInfo
    } = req.body;

    if (!first_name || !last_name || !phone_number || !password) {
      res.status(400);
      throw new Error("All fields are required!");
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    const updateAdUser = await UserService.updateUser(
      {
        first_name,
        last_name,
        phone_number,
        hashedPassword,
        userInfo
      },
      userId
    );

    if (!updateAdUser) {
      res.status(404);
      throw new Error("User not found");
    }

    return res.status(200).json(updateAdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateUserWithoutPassword = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      first_name,
      last_name,
      phone_number,
      userInfo
    } = req.body;

    if (!first_name || !last_name || !phone_number ) {
      res.status(400);
      throw new Error("All fields are required!");
    }
    const updateAdUser = await UserService.updateUserWithoutPassword(
      {
        first_name,
        last_name,
        phone_number,
        userInfo
      },
      userId
    );

    if (!updateAdUser) {
      res.status(404);
      throw new Error("User not found");
    }

    return res.status(200).json(updateAdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
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
      if(logUser.is_activated === 0){
        return res.status(401).json({
          success: 0,
          message: "Please activate your account through  the email sent to you.",
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
    console.log(accessToken);
    const refreshToken = sign(
      { userId: userWithoutPassword._id },
      process.env.TOKEN_KEY2,
      {
        expiresIn: "1d", // Set an appropriate expiration for refresh tokens
      }
    );
console.log( refreshToken);
    res.cookie('accessToken', accessToken, { httpOnly: false, sameSite: 'none', secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: false, sameSite: 'none', secure: true });


    return res.status(200).json({
      islogged: true,
      first_name: userWithoutPassword.first_name,
    });

  } catch (error) {
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


const checkUser = ((req, res) => {

  return res.json({ Status: "Success", Name: req.name, message: "Authorized", type: req.type, id: req.user_id })
});

const passwordForgot = async (req, res) => {

  const { email } = req.body;
  const user = await UserService.getUserByEmail(email);
  if (!user) {

    return res.status(404).json('user not found');
  }
  const secret = (process.env.TOKEN_RESET) + user.password;
  
  const payload = {
    email: user.email,
    id: user.user_id
  }
  const token = sign(payload, secret, { expiresIn: '15m' })
  const link = `${process.env.ClientLink}/resetPassword/${user.user_id}/${token}/update`
  //sending the link 
  recipient = user.email;
  subject = 'Your reset link'

  const emailSent = await UserService.sendLink(recipient, subject, link);

  if (!emailSent) {

    res.status(500).send('Email sending failed');
  }
  return res.status(201).json("Password reset link has been sent to your emaill...");
}


const resetPassword = async (req, res) => {
  const { token, id } = req.body;
  console.log(req.body)
  const [user] = await UserService.getUser(id);
  if (!user) {
    return res.status(404).json('user not found by id');
  }
  
  const secret = (process.env.TOKEN_RESET) + user.password;
  try {
    const decodedToken = verify(token, secret);
    return res.status(201).json({ verify: true });
  } catch (error) {
    return res.status(200).json('link is not valid anymore...');
  }

}

const updatePassword = async (req, res) => {
  const { token, id } = req.body;
  const [user] = await UserService.getUser(id);
  if (!user) {
    return res.status(404).json('user not found by id');
  }
  const secret = (process.env.TOKEN_RESET) + user.password;
  try {
    const decodedToken = verify(token, secret);
    //If verification is successful, you can access the decoded payload
    const { password } = req.body;
    const salt = genSaltSync(10);
    const id = decodedToken.id;
    const HashedPassword = hashSync(password, salt);
    const updatePassword = await UserService.updatePassword(HashedPassword, id)
    return res.status(201).json({ verify: true });
  } catch (error) {
    return res.status(200).json('link is not valid anymore...');
  }

}


const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is missing' });
    }

    const secret = process.env.TOKEN_KEY_VERIFY_EMAIL;
    if (!secret) {
      return res.status(500).json({ error: 'Token secret is missing' });
    }

    const decodedToken = verify(token, secret);
    const user = await UserService.getUserByEmail(decodedToken.email);

    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }

    const activateAccount = await UserService.activateAccount(user.user_id);

    if (activateAccount) {
      return res.status(201).json({ verify: true });
    } else {
      return res.status(500).json({ error: 'Failed to activate the account' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const getUserByGUID = asyncHandler(async (req, res) => {
  const guid = req.params.guid;
  const user = await UserService.getUserByGUID(guid);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json(user);
});


const updateUserByGUID = asyncHandler(async (req, res) => {
  const guid = req.params.guid;
  const user = await UserService.updateUserByGUID(req.body, guid);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.status(200).json(user);
  }
});

const deleteUserByGUID = asyncHandler(async (req, res) => {
  const guid = req.params.guid;
  const user = await UserService.deleteUserByGUID(req.body, guid);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.status(200).json({ message: 'User deleted successfully' });
  }
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
  Logout,
  getUserByAuth,
  passwordForgot,
  resetPassword,
  updatePassword,
  updateUserWithoutPassword,
  verifyEmail,
  getUserByGUID,
  updateUserByGUID,
  deleteUserByGUID
};
