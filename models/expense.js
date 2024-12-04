"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      category: {
        type: DataTypes.ENUM,
        values: [
          "housing",
          "utilities",
          "groceries",
          "transportation",
          "entertainment",
          "healthcare",
          "education",
          "personal",
          "savings",
          "debt_repayment",
          "investment",
          "miscellaneous",
        ],
        allowNull: false,
        defaultValue: "miscellaneous",
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
