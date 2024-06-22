const express = require("express");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHandler");
const router = express.Router();
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    successResponse(res, { user, token }, 201);
  } catch (err) {
    errorResponse(
      res,
      err,
      err?.message || "Failed to register",
      err?.statusCode || 500
    );
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    successResponse(res, { user, token }, 200);
  } catch (err) {
    errorResponse(
      res,
      err,
      err?.message || "Failed to login",
      err?.statusCode || 500
    );
  }
});

module.exports = router;
