"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    static associate(models) {
      Income.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });
    }
  }
  Income.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
      },
      amount: {
        type: DataTypes.DECIMAL,
      },
      source: {
        type: DataTypes.STRING,
        defaultValue: "miscellaneous",
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Income",
      tableName: "incomes",
      underscored: true,
      timestamps: true,
    }
  );
  return Income;
};
