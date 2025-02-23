"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = "1a2b3c4d-5678-90ef-1234-567890abcdef";

    const incomes = [
      {
        id: "c5d5f839-48c7-482b-89d8-3fdca9d7cfab",
        user_id: userId,
        amount: 3200.75,
        recurring: false,
        source: "salary",
        date: "2024-01-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "61a7348b-4982-4b73-848d-4fd92a74996c",
        user_id: userId,
        amount: 850.0,
        recurring: true,
        source: "freelance",
        date: "2024-02-10",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "f7492c8d-51e2-4f84-a537-705c3b4d53ef",
        user_id: userId,
        amount: 1500.0,
        recurring: true,
        source: "business",
        date: "2024-03-20",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "d763d5a8-d547-4a74-8c9d-a3b5f9c1ab83",
        user_id: userId,
        amount: 2700.0,
        recurring: false,
        source: "investment",
        date: "2024-04-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "b39265af-74a9-4fd3-b6b3-57e21d9f12a7",
        user_id: userId,
        amount: 450.5,
        recurring: false,
        source: "rental",
        date: "2024-05-01",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "8fd7357c-4e62-4c68-9937-342f6a8d7c5d",
        user_id: userId,
        amount: 1100.0,
        recurring: false,
        source: "freelance",
        date: "2024-06-10",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "6a5d3f79-83e4-452e-8d19-492b5f3c4b83",
        user_id: userId,
        amount: 500.0,
        recurring: false,
        source: "gifts",
        date: "2024-07-20",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "b9f7c5a6-3a7e-4a1b-bf3d-6e4295c7b8e3",
        user_id: userId,
        amount: 3950.0,
        recurring: false,
        source: "salary",
        date: "2024-08-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "4f9d5a8b-93a4-4e68-bf29-352c7d5a8c7e",
        user_id: userId,
        amount: 780.25,
        recurring: false,
        source: "business",
        date: "2024-09-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3b8d5f79-84e4-4f68-bc3f-483c7d5a8b8e",
        user_id: userId,
        amount: 1220.0,
        recurring: false,
        source: "freelance",
        date: "2024-10-01",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "b9e7d6a5-4b3f-4f79-bc2d-5c3d7e8b9a4f",
        user_id: userId,
        amount: 2750.0,
        recurring: false,
        source: "investment",
        date: "2024-11-20",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "6e5f3a9d-8b4c-482b-bf9e-5c3b7e8b9a5d",
        user_id: userId,
        amount: 620.0,
        recurring: false,
        source: "rental",
        date: "2024-12-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "7d5f3a9b-6c4e-48a7-bd9e-4c2b6e9b5a5f",
        user_id: userId,
        amount: 900.0,
        recurring: false,
        source: "gifts",
        date: "2024-07-25",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "8e5c3a7d-4b6e-4f7d-b9e5-3c6b9a5d7e3f",
        user_id: userId,
        amount: 1250.0,
        recurring: false,
        source: "freelance",
        date: "2024-08-30",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "4e9d5b7c-6a8f-4c9e-bf7d-3b5d9a7e5f3c",
        user_id: userId,
        amount: 1800.0,
        recurring: false,
        source: "salary",
        date: "2024-11-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "9de3e558-94cb-4eae-b631-9de33143bbae",
        user_id: userId,
        amount: 2000.0,
        recurring: true,
        source: "salary",
        date: "2025-01-02",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    // Generate a unique UUID
    await queryInterface.bulkInsert("incomes", incomes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("incomes", {
      id: [
        "c5d5f839-48c7-482b-89d8-3fdca9d7cfab",
        "61a7348b-4982-4b73-848d-4fd92a74996c",
        "f7492c8d-51e2-4f84-a537-705c3b4d53ef",
        "d763d5a8-d547-4a74-8c9d-a3b5f9c1ab83",
        "b39265af-74a9-4fd3-b6b3-57e21d9f12a7",
        "8fd7357c-4e62-4c68-9937-342f6a8d7c5d",
        "6a5d3f79-83e4-452e-8d19-492b5f3c4b83",
        "b9f7c5a6-3a7e-4a1b-bf3d-6e4295c7b8e3",
        "4f9d5a8b-93a4-4e68-bf29-352c7d5a8c7e",
        "3b8d5f79-84e4-4f68-bc3f-483c7d5a8b8e",
        "b9e7d6a5-4b3f-4f79-bc2d-5c3d7e8b9a4f",
        "6e5f3a9d-8b4c-482b-bf9e-5c3b7e8b9a5d",
        "7d5f3a9b-6c4e-48a7-bd9e-4c2b6e9b5a5f",
        "8e5c3a7d-4b6e-4f7d-b9e5-3c6b9a5d7e3f",
        "4e9d5b7c-6a8f-4c9e-bf7d-3b5d9a7e5f3c",
        "9de3e558-94cb-4eae-b631-9de33143bbae",
      ],
    });
  },
};
