const path = require("path");
const dotenv = require("dotenv");

// Load the default `.env` file
const envFilePath = path.resolve(__dirname, "..", ".env");
const result = dotenv.config({ path: envFilePath });

if (result.error) {
  console.warn(`Warning: No .env file found at ${envFilePath}`);
}

if (!process.env.DATABASE_URL) {
  console.warn(
    "Warning: DATABASE_URL is not defined in the environment variables."
  );
}

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
  EXPECTED_ORIGIN: process.env.EXPECTED_ORIGIN,
  EXPECTED_RPID: process.env.EXPECTED_RPID,
};
