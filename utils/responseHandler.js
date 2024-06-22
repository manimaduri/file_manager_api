exports.successResponse = function(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

exports.errorResponse = function(res, error, message, statusCode = 500) {
  console.error("errorResponse...",error);
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Export ErrorHandler
exports.ErrorHandler = ErrorHandler;