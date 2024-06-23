const { ErrorHandler } = require("../../utils/responseHandler");
const File = require("../models/File");
const AWS = require('aws-sdk');

// Configure the AWS region and credentials
AWS.config.update({
  region: 'your-region', // e.g., us-west-2
  // credentials can be specified here if not using environment variables or the credentials file
});

const s3 = new AWS.S3();
exports.createFile = async (fileData) => {
  try {
    const file = new File(fileData);
    await file.save();
    return {
      name: file.name,
      id: file._id,
      parentFolder: file.parentFolder,
      fileUrl: file.fileUrl,
      fileType: file.fileType,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
    };
  } catch (error) {
    throw new ErrorHandler("Failed to create file", 500);
  }
};

exports.getAllFiles = async () => {
  try {
    return File.find();
  } catch (error) {
    throw new ErrorHandler("Failed to retrieve files", 500);
  }
};

exports.getFileById = async (id) => {
  try {
    return File.findById(id);
  } catch (error) {
    throw new ErrorHandler("Failed to retrieve file", 500);
  }
};

exports.updateFile = async (id, fileData) => {
  try {
    return File.findByIdAndUpdate(id, fileData, { new: true });
  } catch (error) {
    throw new ErrorHandler("Failed to update file", 500);
  }
};

exports.deleteFile = async (id) => {
  try {
    // Retrieve the file information from the database
    const file = await File.findById(id);
    if (!file) {
      throw new ErrorHandler("File not found", 404);
    }

    // Delete the file from Amazon S3
    const params = {
      Bucket: 'your-bucket-name', // Replace with your S3 bucket name
      Key: file.filename, // Assuming 'filename' is the key name in S3
    };
    await s3.deleteObject(params).promise();

    // Delete the file record from you
    await File.findByIdAndDelete(id);
  } catch (error) {
    throw new ErrorHandler("Failed to delete file", 500);
  }
};