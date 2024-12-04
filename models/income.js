"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
        type: DataTypes.ENUM,
        values: [
          "salary",
          "freelance",
          "business",
          "investment",
          "rental",
          "gifts",
          "other",
        ],
        allowNull: false,
        defaultValue: "salary",
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
