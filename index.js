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

const DUMMY_DATA = {
  name: "Dhanush",
};

const userShema = new mongoose.Schema({
  name: String,
});
const User = mongoose.model("User", userShema);
try {
  User.create(DUMMY_DATA).then((user) => {
    console.log(user);
    console.log(user.name);
    console.log("user created");
  });
} catch (error) {}

try {
  mongoose.connect(process.env.MONGODB_API).then(() => {
    console.log("Connected to the database!");
  });
} catch (error) {
  console.log(error);
}
