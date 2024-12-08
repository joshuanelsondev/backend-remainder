"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DisposableIncome extends Model {
    static associate(models) {
      DisposableIncome.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
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
      disposableIncome: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          isDecimal: true,
          min: 0,
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
      modelName: "DisposableIncome",
      tableName: "disposable_incomes",
      underscored: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["userId", "calculatedAt"],
        },
      ],
    }
  );

  DisposableIncome.beforeSave((instance) => {
    instance.disposableIncome = instance.totalIncome - instance.totalExpenses;
  });

  return DisposableIncome;
};
