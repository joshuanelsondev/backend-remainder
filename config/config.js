const path = require("path");
const dotenv = require("dotenv");
const process = require("process");

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
const envFilePath = path.resolve(__dirname, "..", envFile);
const result = dotenv.config({ path: envFilePath });

if (result.error) {
  console.warn(`Warning: No .env file found at ${envFilePath}`);
}

if (!process.env.DATABASE_URL) {
  console.warn(
    "Warning: DATABASE_URL is not defined in the environment variables."
  );
}

if (result.error) {
  console.warn(`Warning: No .env file found at ${envFilePath}`);
}

if (!process.env.DATABASE_URL) {
  console.warn(
    "Warning: DATABASE_URL is not defined in the environment variables."
  );
}

const baseConfig = {
  url: process.env.DATABASE_URL,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
  EXPECTED_ORIGIN: process.env.EXPECTED_ORIGIN,
  EXPECTED_RPID: process.env.EXPECTED_RPID,
};

const environmentConfigs = {
  development: {
    logging: console.log,
  },
  staging: {
    logging: false,
  },
  production: {
    logging: false,
  },
};

module.exports = {
  ...baseConfig,
  ...environmentConfigs[envFile],
};
