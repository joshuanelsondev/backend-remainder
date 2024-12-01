const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Remainder");
});

app.use("/auth", authRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

module.exports = app;
