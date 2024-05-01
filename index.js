const express = require("express");

const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});

app.get("/", (req, res) => {
  res.send("Backend is connected");
});
