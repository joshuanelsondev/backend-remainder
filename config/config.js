const path = require("path");
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";

let envFilePath;
switch (env) {
  case "production":
    envFilePath = path.resolve(__dirname, "..", ".env.production");
    break;
  case "staging":
    envFilePath = path.resolve(__dirname, "..", ".env.staging");
    break;
  case "development":
  default:
    envFilePath = path.resolve(__dirname, "..", ".env");
    break;
}

const result = dotenv.config({ path: envFilePath });

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

module.exports = {
  ...baseConfig,
  ...environmentConfigs[env],
};
