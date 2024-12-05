const { Sequelize } = require("sequelize");
const config = require("./config");

const { url, dialect, logging } = config;

const sequelize = new Sequelize(url, {
  dialect: dialect || "postgres",
  logging: logging,
});

module.exports = sequelize;
