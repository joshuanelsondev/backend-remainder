"use strict";
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: "c9d19c8a-48c4-4a7b-8d8d-123456789def",
        first_name: "Admin",
        last_name: "User",
        email: "admin@example.com",
        phone_number: "+1234567891",
        date_of_birth: "1985-01-01",
        password: "$2b$10$abcdefghijklmnopqrstuvwx",
        is_verified: true,
        mfa_enabled: false,
        is_admin: true,
        risk_preference: "low",
        failed_login_attempts: 0,
        account_locked: false,
        last_login_at: new Date(),
        challenge: null,
        verification_token: null,
        webauthnid: null,
        webauthnpublickey: null,
        auth_counter: 0,
        mfa_secret: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "1a2b3c4d-5678-90ef-1234-567890abcdef",
        first_name: "guest",
        last_name: "user",
        email: "guestuser@mail.com",
        phone_number: null,
        date_of_birth: null,
        password: await bcrypt.hash("SecurePassword123!", 10),
        is_verified: true,
        mfa_enabled: true,
        is_admin: false,
        risk_preference: "low",
        failed_login_attempts: 0,
        account_locked: false,
        last_login_at: new Date(),
        challenge: null,
        verification_token: null,
        webauthnid: null,
        webauthnpublickey: null,
        auth_counter: 0,
        mfa_secret: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      id: [
        "c9d19c8a-48c4-4a7b-8d8d-123456789def",
        "1a2b3c4d-5678-90ef-1234-567890abcdef",
      ],
    });
  },
};
