// authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (userData) => {
  let user = await User.findOne({ email: userData.email });

  if (user) {
    throw new Error('User already exists');
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

  return { user, token };
};

exports.login = async (userData) => {
  let user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (!isMatch) {
    throw new Error('Invalid Credentials');
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

  return { user, token };
};