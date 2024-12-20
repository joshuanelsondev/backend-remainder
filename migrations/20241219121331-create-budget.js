"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("budgets", {
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
        onDelete: "CASCADE",
      },
      total_income: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total_expenses: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      income_transactions: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      expense_transactions: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      income_sources: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      expense_sources: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      total_sources: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      budget: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      calculated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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

    await queryInterface.addIndex("budgets", ["user_id", "calculated_at"], {
      unique: true,
      name: "idx_userId_calculatedAt",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("budgets", "idx_userId_calculatedAt");
    await queryInterface.dropTable("budgets");
  },
};
