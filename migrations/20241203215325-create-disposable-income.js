"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("disposable_incomes", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      total_income: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      total_expenses: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      disposable_income: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      calculated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("disposable_incomes");
  },
};
