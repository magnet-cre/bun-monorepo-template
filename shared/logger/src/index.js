// src/logger.js
import winston from "winston";

// Custom formatter for development (human-friendly)
const customDevFormat = winston.format.printf(
  ({ timestamp, level, message, ...metadata }) => {
    // If the message is an object, convert it to a string.
    const msg =
      typeof message === "object" && message !== null
        ? JSON.stringify(message)
        : message || "";
    // Format any extra metadata, if present.
    const metaKeys = Object.keys(metadata);
    const metaString = metaKeys.length ? JSON.stringify(metadata) : "";
    // If a message exists, print it, otherwise only the metadata.
    return `${timestamp} [${level}]: ${msg}${
      metaString ? " " + metaString : ""
    }`;
  }
);

// Development format: human-readable and colorized.
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize(),
  customDevFormat
);

// Production format: JSON logs for easy ingestion by Loki.
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// Use NODE_ENV to decide the format.
// For Bun, you can start your app like:
//   NODE_ENV=production bun run index.js
// or leave NODE_ENV unset (or set to "development") during local development.
const isProduction = process.env.NODE_ENV === "production";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: isProduction ? prodFormat : devFormat,
  transports: [new winston.transports.Console()],
});

export default logger;
