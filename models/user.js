"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      mfaEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      riskPreference: {
        type: DataTypes.ENUM,
        values: ["low", "high"],
        allowNull: false,
        defaultValue: "low",
      },
      lastLoginAt: DataTypes.TIME,
      verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      webauthnid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      webauthnpublickey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authCounter: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      mfaSecret: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );
  return User;
};
