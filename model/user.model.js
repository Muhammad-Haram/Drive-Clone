const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    minlenght: [3, "Username must be at least 3 characters long"],
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlenght: [13, "Email must be at least 13 characters long"],
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlenght: [5, "Passowrd must be at least 5 characters long"],
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
