"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
          is: /^\+?[1-9]\d{1,14}$/,
        },
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [60, 500],
        },
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mfa_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      risk_preference: {
        type: Sequelize.ENUM("low", "high"),
        allowNull: false,
        defaultValue: "low",
      },
      failed_login_attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      account_locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      last_login_at: {
        type: Sequelize.DATE,
      },
      challenge: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verification_token: {
        type: Sequelize.STRING,
      },
      webauthnid: {
        type: Sequelize.STRING,
      },
      webauthnpublickey: {
        type: Sequelize.STRING,
      },
      auth_counter: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      mfa_secret: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
