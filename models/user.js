"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Income, {
        foreignKey: "userId",
        as: "incomes",
      });

      User.hasMany(models.Expense, {
        foreignKey: "userId",
        as: "expenses",
      });

      User.hasOne(models.DisposableIncome, {
        foreignKey: "userId",
        as: "disposable_incomes",
      });
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
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          is: /^\+?[1-9]\d{1,14}$/,
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 500],
        },
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
      failedLoginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      accountLocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
      },
      challenge: {
        type: DataTypes.STRING,
        allowNull: true,
      },
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
