const express = require('express');
const router = express.Router();
const authRouter = require('./auth');

// Assuming you have controllers for handling the logic

// Register API endpoint
router.use('/auth', authRouter);


module.exports = router;