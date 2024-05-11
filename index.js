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

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

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

app.get("/dashboard", (req, res) => {
  res.send("Welcome to the dashboard!");
});

app.post("/dashboard/create-job", (req, res) => {
  try {
    const jobData = req.body;
    res.status(200).json({ message: "Job created successfully", jobData });
    console.log(jobData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create job" });
  }
});

app.post("/dashboard/create-job/des", (req, res) => {
  try {
    const desData = req.body;
    console.log(desData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create job" });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    await User.findOneAndUpdate({ clerk_id: id }, userData);
    console.log("User data updated:", userData);
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Failed to update user data" });
  }
});

app.get("/users:id", (req, res) => {
  try {
    console.log(users.id);
    console.log(users.details);
    res.status(200).json({ message: "user fetched successfully", users });
  } catch (error) {}
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ clerk_id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findOneAndDelete({ clerk_id: id });
    console.log("User deleted:", id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
