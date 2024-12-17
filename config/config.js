const path = require("path");
const dotenv = require("dotenv");
const process = require("process");

if (process.env.NODE_ENV !== "production") {
  const envFile = `.env.${process.env.NODE_ENV || "development"}`;
  const envFilePath = path.resolve(__dirname, "..", envFile);
  const result = dotenv.config({ path: envFilePath });

  if (result.error) {
    console.warn(`Warning: No .env file found at ${envFilePath}`);
  }
}

const baseConfig = {
  url: process.env.DATABASE_URL,
  dialect: "postgres",
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
    dialectOptions: {
      ssl: false,
    },
  },
  staging: {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

const currentEnvironment = process.env.NODE_ENV || "development";

module.exports = {
  ...baseConfig,
  ...environmentConfigs[currentEnvironment],
};
