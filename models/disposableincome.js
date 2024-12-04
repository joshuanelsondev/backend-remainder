"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DisposableIncome extends Model {
    static associate(models) {
      DisposableIncome.belongsTo(models.User, {
        foreignKey: "userId",
        as: "users",
      });
    }
  }
  DisposableIncome.init(
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
        references: { model: "users", key: "id" },
      },
      totalIncome: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      totalExpenses: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      disposableIncome: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      calculatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "DisposableIncome",
      tableName: "disposable_incomes",
      underscored: true,
      timestamps: true,
    }
  );
  return DisposableIncome;
};
