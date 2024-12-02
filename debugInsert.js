require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./models"); // Adjust the path to your models folder

// Configure Sequelize (ensure this matches your current setup)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: console.log, // Enables query logging
});

(async () => {
  try {
    const sampleUser = {
      id: "9581d268-193d-41d8-9332-8984a9268d5c",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe123",
      email: "john.doe@example.com",
      password: "$2a$10$SawaPa46qGr3FZgkMzCY4O77i4SlZQyZk8xAyN5cRemfKABtuLrP.",
      isVerified: false,
      lastLoginAt: new Date(),
      verificationToken:
        "2d77ff247101137ccb170d7dff73f80bdf1b1b882d9bd3453680d2c45db8b26c",
    };

    const newUser = await db.User.create(sampleUser);
    console.log("User created successfully:", newUser.toJSON());
  } catch (error) {
    console.error("Error during user creation:", error);
  } finally {
    await sequelize.close();
    console.log("Connection closed.");
  }
})();
