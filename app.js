const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const disposableIncomeRoutes = require("./routes/disposableIncomeRoutes");
const authenticateUser = require("./middleware/authenticateUser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Remainder");
});

// Authentication routes for signup and login
app.use("/auth", authRoutes);

// Protected Routes
app.use("/users", authenticateUser, userRoutes);
app.use("/incomes", authenticateUser, incomeRoutes);
app.use("/expenses", authenticateUser, expenseRoutes);
app.use("/disposable-income", authenticateUser, disposableIncomeRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

module.exports = app;
