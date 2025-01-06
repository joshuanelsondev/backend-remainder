"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate(models) {
      Budget.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Budget.init(
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
        onDelete: "CASCADE",
      },
      totalIncome: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      totalExpenses: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      incomeTransactions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      expenseTransactions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      incomeSources: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      expenseSources: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      totalSources: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      budget: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          isDecimal: true,
        },
      },
      calculatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Budget",
      tableName: "budgets",
      underscored: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "calculated_at"],
        },
      ],
    }
  );

  Budget.beforeSave((instance) => {
    instance.budget = instance.totalIncome - instance.totalExpenses;
  });

  return Budget;
};
