const express = require("express");
const { successResponse, errorResponse } = require("../../utils/responseHandler");
const fileService = require("../services/fileService");
const {uploadToS3Middleware} = require("../middleware/uploadFileToS3");
const router = express.Router();



// Create a new file
router.post("/",...uploadToS3Middleware, async (req, res) => {
  try {
    const fileData = {
      name: req.body.name,
      user: req.user.id, // Assuming the authMiddleware adds the user object to req
      parentFolder: req.body.parentFolder, // Optional
      fileUrl: req.file?.cloudStoragePublicUrl, // Add the URL of the uploaded file
      fileType : req.file?.mimetype,
    };
    const file = await fileService.createFile(fileData);
    successResponse(res, file, 201);
  } catch (err) {
    errorResponse(res, err, err?.message || "Failed to create file", err?.statusCode || 500);
  }
});

// Retrieve all files
router.get("/", async (req, res) => {
  try {
    const files = await fileService.getAllFiles();
    successResponse(res, files, 200);
  } catch (err) {
    errorResponse(res, err, err?.message || "Failed to retrieve files", err?.statusCode || 500);
  }
});

// Retrieve a single file by id
router.get("/:id", async (req, res) => {
  try {
    const file = await fileService.getFileById(req.params.id);
    if (!file) {
      return errorResponse(res, null, "File not found", 404);
    }
    successResponse(res, file, 200);
  } catch (err) {
    errorResponse(res, err, err?.message || "Failed to retrieve file", err?.statusCode || 500);
  }
});

// Update a file by id
router.put("/:id", async (req, res) => {
  try {
    const updatedFile = await fileService.updateFile(req.params.id, req.body);
    successResponse(res, updatedFile, 200);
  } catch (err) {
    errorResponse(res, err, err?.message || "Failed to update file", err?.statusCode || 500);
  }
});

// Delete a file by id
router.delete("/:id", async (req, res) => {
  try {
    await fileService.deleteFile(req.params.id);
    successResponse(res, "File deleted successfully", 204);
  } catch (err) {
    errorResponse(res, err, err?.message || "Failed to delete file", err?.statusCode || 500);
  }
});

module.exports = router;