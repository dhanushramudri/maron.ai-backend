const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_API);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  clerk_id: {
    type: String,
    unique: true,
    required: true,
    alias: "id",
  },
  fullName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true, // Corrected typo
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/user", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();
    console.log("User data saved to MongoDB:", newUser);
    res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data to MongoDB:", error);
    res.status(500).json({ error: "Failed to save user data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
