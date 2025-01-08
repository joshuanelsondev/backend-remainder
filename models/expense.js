"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });
    }
  }
  Expense.init(
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "other",
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Expense",
      tableName: "expenses",
      underscored: true,
      timestamps: true,
    }
  );
  return Expense;
};
