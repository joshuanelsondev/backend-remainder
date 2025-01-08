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
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      recurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      source: {
        type: DataTypes.STRING,
        defaultValue: "other",
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
