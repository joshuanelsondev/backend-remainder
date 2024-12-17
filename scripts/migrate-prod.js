const { exec } = require("child_process");
const dotenv = require("dotenv");
const path = require("path");

// Explicitly load .env.production
const envPath = path.resolve(__dirname, "../.env.production");
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(`Failed to load .env.production: ${result.error}`);
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error(
    "Error: DATABASE_URL is not defined in the environment variables."
  );
  process.exit(1);
}

console.log("Running migrations for production...");
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log("DATABASE_URL loaded securely.");

// Run the migration command
const command = "npx sequelize-cli db:migrate";

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Migration failed: ${error.message}`);
    process.exit(1);
  }
  if (stderr) console.error(`stderr: ${stderr}`);
  console.log(stdout);
});
