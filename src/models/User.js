const mongoose = require('mongoose');

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

const User = mongoose.model('user', UserSchema);
module.exports = User;