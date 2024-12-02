require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./models"); // Adjust the path to your models folder
const User = db.User;
// Configure Sequelize (ensure this matches your current setup)
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: console.log, // Enables query logging
  }
);

(async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // await sequelize.query(`
    //   INSERT INTO "Users" (
    //     "id", "first_name", "last_name", "username", "email", "password",
    //     "is_verified", "mfa_enabled", "risk_preference", "last_login_at",
    //     "verification_token", "auth_counter", "created_at", "updated_at"
    //   ) VALUES (
    //     '1b7d9291-2eec-4398-bc7b-c352c2749eb9',
    //     'John',
    //     'Doe',
    //     'johndoe123',
    //     'john.doe@example.com',
    //     '$2b$10$EIXixZh9gk.bk4bS3/8GAeaQrVr6.7gDdX7h1HcdYNcO9jjp1zM/2',
    //     false,
    //     false,
    //     'low',
    //     NULL,
    //     '3360422a1419ceaedb328fecf48bc0dcb318f642cf3b5cf3e088ef3927c350fa',
    //     0,
    //     NOW(),
    //     NOW()
    //   );
    // `);

    // Sample user data
    const sampleUser = {
      id: "9581d268-193d-41d8-9332-8984a9268d5c",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe123",
      email: "john.doe@example.com",
      password: "$2a$10$SawaPa46qGr3FZgkMzCY4O77i4SlZQyZk8xAyN5cRemfKABtuLrP.",
      isVerified: false,
      mfaEnabled: false,
      riskPreference: "low",
      lastLoginAt: null,
      verificationToken:
        "2d77ff247101137ccb170d7dff73f80bdf1b1b882d9bd3453680d2c45db8b26c",
      authCounter: 0,
    };

    // console.log("Attempting validation...");
    // try {
    //   // Validate the data without saving
    //   const validatedUser = await db.User.build(sampleUser).validate();
    //   console.log("Validation passed:", validatedUser.toJSON());
    // } catch (validationError) {
    //   console.error("Validation failed:", validationError);
    //   return;
    // }

    // try {
    //   // Create the user in the database
    //   console.log("TableName: ", db.User.getTableName());

    //   const newUser = await db.User.create(sampleUser);
    //   console.log("User created successfully:", newUser.toJSON());
    // } catch (createError) {
    //   console.error("Error during user creation:", createError);
    // }

    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Connected to:", sequelize.config.database);

    console.log("Table name:", db.User.getTableName());
    console.log("Schema:", db.User._schema);

    console.log("Validating user...");
    const validatedUser = await db.User.build(sampleUser).validate();
    console.log("Validation passed:", validatedUser.toJSON());

    console.log("Attempting to create user...");
    const newUser = await User.create(sampleUser);
    console.log("User created:", newUser.toJSON());
  } catch (error) {
    console.error("Error during debugging:", error.message);
    if (error.parameters) {
      console.log("Query Parameters:", error.parameters);
    }
  } finally {
    await sequelize.close();
    console.log("Connection closed.");
  }
})();
