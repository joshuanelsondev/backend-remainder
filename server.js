const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync();
  })
  .then(() => {
    console.log("All models were synchronized successfully.");
    app.listen(PORT, () => {
      console.log(`[server] Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "Error synchronizing models or connecting to the database: ",
      error
    );
    process.exit(1);
  });
