const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Multer configuration for file uploads
const multerUpload = multer({ storage: multer.memoryStorage() });

const uploadFileToS3 = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const params = {
    Bucket: 'your-bucket-name', // Replace with your bucket name
    Key: req.file.originalname, // File name you want to save as
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
    ACL: 'public-read', // If you want the file to be publicly readable
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return next(err);
    }
    // The URL of the uploaded file
    req.file.cloudStoragePublicUrl = data.Location;
    next();
  });
};

// Middleware to handle file upload and S3 upload
exports.uploadToS3Middleware = [multerUpload.single('file'), uploadFileToS3];