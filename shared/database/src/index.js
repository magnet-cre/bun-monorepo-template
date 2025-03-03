import sql from "mssql";
import logger from "@project_root/logger";

// Validate required environment variables
if (!process.env.SQL_DATABASE_USERNAME) {
  throw new Error("SQL_DATABASE_USERNAME is not set");
}
if (!process.env.SQL_DATABASE_PASSWORD) {
  throw new Error("SQL_DATABASE_PASSWORD is not set");
}
if (!process.env.SQL_DATABASE_SERVER && !process.env.SQL_DATABASE_SERVER_IP) {
  throw new Error("SQL_DATABASE_SERVER or SQL_DATABASE_SERVER_IP is not set");
}
if (!process.env.SQL_DATABASE_NAME) {
  throw new Error("SQL_DATABASE_NAME is not set");
}
if (!process.env.SQL_DATABASE_INSTANCE_NAME) {
  throw new Error("SQL_DATABASE_INSTANCE_NAME is not set");
}

export let pool = null;

const config = {
  user: process.env.SQL_DATABASE_USERNAME, // Your SQL Server username
  password: process.env.SQL_DATABASE_PASSWORD, // Your password
  server: process.env.SQL_DATABASE_SERVER_IP || process.env.SQL_DATABASE_SERVER, // Server name or IP
  database: process.env.SQL_DATABASE_NAME, // Database name
  options: {
    instanceName: process.env.SQL_DATABASE_INSTANCE_NAME,
    encrypt: false, // Adjust if SSL is enabled
    trustServerCertificate: true, // Adjust if needed
  },
  port: 1433, // Default port for SQL Server
};

export async function connectToDatabase() {
  try {
    logger.info({
      event: "SQL_CONNECTION",
      message: "Connecting to SQL Server...",
    });
    pool = await sql.connect(config);
    logger.info({
      event: "SQL_CONNECTION",
      message: "Connected to SQL Server!",
    });
    return pool;
  } catch (err) {
    logger.error({
      event: "SQL_CONNECTION_ERROR",
      message: "Error connecting to SQL Server",
      error: err.message,
    });
    throw err;
  }
}
