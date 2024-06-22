const express = require('express');
const connectDB = require('./config/db');
const router = require('./routes');
const { errorResponse } = require('../utils/responseHandler');

const app = express();

// Connect Database
(async () => {
  try {
    await connectDB();
    console.log('Database connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
})();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("error middleware...",err.stack);
  errorResponse(res, err, err?.message || 'Server Error', err?.statusCode || 500);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));