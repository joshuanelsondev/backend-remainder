const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const disposableIncomeRoutes = require("./routes/disposableIncomeRoutes");
const authenticateUser = require("./middleware/authenticateUser");
const authorizeAdmin = require("./middleware/authenticateUser");
const generateAdminTokenRoute = require("./routes/admin-token");

const app = express();

// Allowed Origins
const allowedOrigins = process.env.FRONTEND_URL;
console.log("ALLOWED ORIGINS:", allowedOrigins);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Development-only route for generating admin token
if (process.env.NODE_ENV === "development") {
  app.use("/dev", generateAdminTokenRoute);
}

// Authentication routes for signup and login
app.use("/auth", authRoutes);

// Protected Routes
app.use("/users", authenticateUser, userRoutes);
app.use("/incomes", authenticateUser, incomeRoutes);
app.use("/expenses", authenticateUser, expenseRoutes);
app.use("/disposable-income", authenticateUser, disposableIncomeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Remainder");
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

module.exports = app;
