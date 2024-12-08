const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const disposableIncomeRoutes = require("./routes/disposableIncomeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Remainder");
});

app.use("/users", userRoutes);
app.use("/incomes", incomeRoutes);
app.use("/expenses", expenseRoutes);
app.use("/disposable-income", disposabIncomeRoutes);
app.use("/auth", authRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

module.exports = app;
