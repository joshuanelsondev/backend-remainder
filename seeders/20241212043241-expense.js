"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = "1a2b3c4d-5678-90ef-1234-567890abcdef";
    const expenses = [
      {
        id: "e8a54329-d678-4db2-9281-9d2b6a4d4592",
        user_id: userId,
        amount: 1200.5,
        category: "rent",
        date: "2024-01-25",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "a9438f52-52c1-46f2-bf94-6da92a8dbf83",
        user_id: userId,
        amount: 200.0,
        category: "utilities",
        date: "2024-02-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "5a37295d-7dc6-469d-bc3e-5f8d4e6a7298",
        user_id: userId,
        amount: 450.0,
        category: "groceries",
        date: "2024-03-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "8f7281cd-83c2-43d6-bf1b-a743b69d87c2",
        user_id: userId,
        amount: 80.0,
        category: "entertainment",
        date: "2024-03-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "c5a7d6f8-9b5d-4b3e-8427-6d2b7e4c8a93",
        user_id: userId,
        amount: 300.0,
        category: "transportation",
        date: "2024-04-10",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "a5d7f6c3-92e4-482d-bc9d-7d3e9a8f5b6e",
        user_id: userId,
        amount: 150.0,
        category: "personal",
        date: "2024-05-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "b6d8c5e7-4a3f-4e8d-b9f2-5a6d9e8c7b4f",
        user_id: userId,
        amount: 250.0,
        category: "healthcare",
        date: "2024-06-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "d3f7e5b9-6c8f-4a5d-b9e4-8b7e3d9a5f4c",
        user_id: userId,
        amount: 400.0,
        category: "education",
        date: "2024-07-20",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "e9c7a5d3-4f6e-4d8b-bf7c-5a9d3e7b8f6d",
        user_id: userId,
        amount: 1000.0,
        category: "savings",
        date: "2024-08-10",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "4b9d3a7e-5f6c-48d8-bc7d-9e5a7d8b6c9f",
        user_id: userId,
        amount: 500.0,
        category: "debt",
        date: "2024-09-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "7d9c5a8f-4b6e-4f7a-bc9e-5a7f3e9b4d6c",
        user_id: userId,
        amount: 220.0,
        category: "groceries",
        date: "2024-10-01",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3d7f6a9b-8e4c-482a-bd9e-5c7d9a8f4b6e",
        user_id: userId,
        amount: 120.0,
        category: "entertainment",
        date: "2024-11-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "a6e5b7d9-4c8f-4f7a-b9c5-7e3d8f9a6b4c",
        user_id: userId,
        amount: 75.0,
        category: "miscellaneous",
        date: "2024-12-01",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "8e4d6a9c-5f7a-4f3d-bc9e-5a9b7d8f6c4e",
        user_id: userId,
        amount: 300.0,
        category: "transportation",
        date: "2024-12-10",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "7f6c3a9e-5b7d-4a9f-bd3e-5c8a9e6b7d4f",
        user_id: userId,
        amount: 450.0,
        category: "healthcare",
        date: "2024-12-20",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "b6e7e7e3-7807-4e2e-845d-a0b1d23d843b",
        user_id: userId,
        amount: 1000.0,
        category: "rent",
        date: "2024-12-20",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    // Random date in 2024, formatted as YYYY-MM-DD
    await queryInterface.bulkInsert("expenses", expenses);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("expenses", {
      id: [
        "e8a54329-d678-4db2-9281-9d2b6a4d4592",
        "a9438f52-52c1-46f2-bf94-6da92a8dbf83",
        "5a37295d-7dc6-469d-bc3e-5f8d4e6a7298",
        "8f7281cd-83c2-43d6-bf1b-a743b69d87c2",
        "c5a7d6f8-9b5d-4b3e-8427-6d2b7e4c8a93",
        "a5d7f6c3-92e4-482d-bc9d-7d3e9a8f5b6e",
        "b6d8c5e7-4a3f-4e8d-b9f2-5a6d9e8c7b4f",
        "d3f7e5b9-6c8f-4a5d-b9e4-8b7e3d9a5f4c",
        "e9c7a5d3-4f6e-4d8b-bf7c-5a9d3e7b8f6d",
        "4b9d3a7e-5f6c-48d8-bc7d-9e5a7d8b6c9f",
        "7d9c5a8f-4b6e-4f7a-bc9e-5a7f3e9b4d6c",
        "3d7f6a9b-8e4c-482a-bd9e-5c7d9a8f4b6e",
        "a6e5b7d9-4c8f-4f7a-b9c5-7e3d8f9a6b4c",
        "8e4d6a9c-5f7a-4f3d-bc9e-5a9b7d8f6c4e",
        "7f6c3a9e-5b7d-4a9f-bd3e-5c8a9e6b7d4f",
        "b6e7e7e3-7807-4e2e-845d-a0b1d23d843b",
      ],
    });
  },
};
