const express = require('express');
const { successResponse, errorResponse } = require('../../utils/responseHandler');
const router = express.Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    successResponse(res, { user, token },201);
  } catch (err) {
    errorResponse(res,err, err?.message || "Failed to register" ,400);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;