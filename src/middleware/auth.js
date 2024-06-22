const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { errorResponse } = require("../../utils/responseHandler");

dotenv.config();

module.exports = function (req, res, next) {
  // Get the Authorization header
  const authHeader = req.header("Authorization");

  // Check if not Authorization header
  if (!authHeader) {
    return errorResponse(
      res,
      null,
      "No Authorization header, authorization denied",
      401
    );
  }

  // Check if Authorization header is in the format "Bearer <token>"
  if (!authHeader.startsWith("Bearer ")) {
    return errorResponse(
      res,
      authHeader,
      "Invalid Authorization header format, authorization denied",
      401
    );
  }

  // Extract the token from the Authorization header
  const token = authHeader.substring(7); // Skip the "Bearer " part

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    next(err);
  }
};
