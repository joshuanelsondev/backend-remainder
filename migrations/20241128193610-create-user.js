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
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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
      last_login_at: {
        type: Sequelize.TIME,
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
