const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
  // registration logic here
});

// Login route
router.post('/login', async (req, res) => {
  // login logic here
});

module.exports = router;