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
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      totalIncome: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      totalExpenses: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      disposableIncome: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      calculatedAt: {
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

    await queryInterface.addIndex(
      "disposable_incomes",
      ["userId", "calculatedAt"],
      {
        unique: true,
        name: "idx_userId_calculatedAt",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("disposable_incomes");
  },
};
