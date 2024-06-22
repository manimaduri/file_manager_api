const { ErrorHandler } = require("../../utils/responseHandler");
const Folder = require("../models/Folder");

exports.createFolder = async (folderData) => {
    try {
      const folder = new Folder(folderData);
      await folder.save();
      return {
        name: folder.name,
        id: folder._id,
        parentFolder: folder.parentFolder,
        files: folder.files,
      };
    } catch (error) {
      throw new ErrorHandler("Failed to create folder", 500);
    }
  };
  
  exports.getAllFolders = async () => {
    try {
      return Folder.find();
    } catch (error) {
      throw new ErrorHandler("Failed to retrieve folders", 500);
    }
  };
  
  exports.getFolderById = async (id) => {
    try {
      return Folder.findById(id);
    } catch (error) {
      throw new ErrorHandler("Failed to retrieve folder", 500);
    }
  };
  
  exports.updateFolder = async (id, folderData) => {
    try {
      return Folder.findByIdAndUpdate(id, folderData, { new: true });
    } catch (error) {
      throw new ErrorHandler("Failed to update folder", 500);
    }
  };
  
  exports.deleteFolder = async (id) => {
    try {
      await Folder.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorHandler("Failed to delete folder", 500);
    }
  };
