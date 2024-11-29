const express = require("express");
const sequelize = require("./config/database");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`[server] Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing models: ", error);
  });

module.exports = app;
