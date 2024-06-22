// authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ErrorHandler } = require('../../utils/responseHandler');

exports.register = async (userData) => {
  let user = await User.findOne({ email: userData.email });

  if (user) {
    throw new ErrorHandler('User already exists', 400);
  }

  user = new User(userData);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

  // Exclude unnecessary data
  const userResponse = {
    id: user._id,
    name: user.name,
    profilePic: user.profilePic,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user: userResponse, token };
};

exports.login = async (userData) => {
  let user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new ErrorHandler('Invalid Credentials', 401);
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (!isMatch) {
    throw new ErrorHandler('Invalid Credentials', 401);
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

   // Exclude unnecessary data
   const userResponse = {
    id: user._id,
    name: user.name,
    profilePic: user.profilePic,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user : userResponse, token };
};