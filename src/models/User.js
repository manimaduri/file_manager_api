const mongoose = require('mongoose');
const Folder = require('./Folder');
const File = require('./File');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  profilePic: {
    type: String,
    default: '',
  },
  folders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  }],
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }]
});

// Middleware to delete user's files and folders when user is removed
UserSchema.pre('remove', async function(next) {
  try {
    // Remove all folders associated with the user
    await Folder.deleteMany({ _id: { $in: this.folders } });

    // Remove all files associated with the user
    await File.deleteMany({ _id: { $in: this.files } });

    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;