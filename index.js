const express = require("express");

const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});

app.get("/", (req, res) => {
  res.send("Backend is connected");
});

const userShema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    requried: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  primaryEmailAddress: {
    imageUrl: String,
    lastSignInAt: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  publicMetadata: {
    type: Object,
    default: {},
  },
  verifiedEmailAddress: {
    type: Boolean,
    default: false,
  },
  verifiedPhoneNumber: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userShema);

try {
  mongoose.connect(process.env.MONGODB_API).then(() => {
    console.log("Connected to the database!");
  });
} catch (error) {
  console.log(error);
}

module.exports = User;
