const jwt = require('jsonwebtoken');

export function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user.id;
  } catch (err) {
    console.log('Invalid token');
    throw new Error('Invalid token');
  }
}