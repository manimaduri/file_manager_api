exports.successResponse = function(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

exports.errorResponse = function(res, error, message, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}