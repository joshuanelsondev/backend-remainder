const { Sequelize } = require("sequelize");
const config = require("./config");

const env = process.env.NODE_ENV || "development";
const { url, dialect, logging, dialectOptions } = config;

const sequelize = new Sequelize(url, {
  dialect: dialect || "postgres",
  logging: logging,
  dialectOptions: dialectOptions,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
