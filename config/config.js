const path = require('path');
const dotenv = require('dotenv');

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
const envFilePath = path.resolve(__dirname, '..', envFile);
const result = dotenv.config({ path: envFilePath });

if (result.error) {
  console.warn(`Warning: No .env file found at ${envFilePath}`);
}

if (!process.env.DATABASE_URL) {
  console.warn(
    'Warning: DATABASE_URL is not defined in the environment variables.'
  );
}

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
