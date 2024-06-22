const express = require("express");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHandler");
const folderService = require("../services/folderService");

const router = express.Router();

// Create a new folder
router.post("/", async (req, res) => {
  try {
    const folderData = {
      name: req.body.name,
      user: req.user.id, // Assuming the authMiddleware adds the user object to req
      parentFolder: req.body.parentFolder, // Optional
      files: req.body.files, // Optional
    };
    const folder = await folderService.createFolder(folderData);
    successResponse(res, folder, 201);
  } catch (err) {
    errorResponse(
      res,
      err,
      err?.message || "Failed to create folder",
      err?.statusCode || 500
    );
  }
});

// Retrieve all folders
router.get("/", async (req, res) => {
  try {
    const folders = await folderService.getAllFolders();
    successResponse(res, folders, 200);
  } catch (err) {
    errorResponse(
      res,
      err,
      err?.message || "Failed to retrieve folders",
      err?.statusCode || 500
    );
  }
});

// Retrieve a single folder by id
router.get("/:id", async (req, res) => {
  try {
    const folder = await folderService.getFolderById(req.params.id);
    if (!folder) {
      return errorResponse(res, null, "Folder not found", 404);
    }
    successResponse(res, folder, 200);
  } catch (err) {
    errorResponse(
      res,
      err,
      err?.message || "Failed to retrieve folder",
      err?.statusCode || 500
    );
  }
});

// Update a folder by id
router.put("/:id", async (req, res) => {
  try {
    const updatedFolder = await folderService.updateFolder(
      req.params.id,
      req.body
    );
    successResponse(res, updatedFolder, 200);
  } catch (err) {
    errorResponse(
      res,
      err,
      err?.message || "Failed to update folder",
      err?.statusCode || 500
    );
  }
});

// Delete a folder by id
router.delete("/:id", async (req, res) => {
  try {
    await folderService.deleteFolder(req.params.id);
    successResponse(res, "Folder deleted successfully", 204);
  } catch (err) {
    errorResponse(
      res,
      err,
      err?.message || "Failed to delete folder",
      err?.statusCode || 500
    );
  }
});

module.exports = router;
