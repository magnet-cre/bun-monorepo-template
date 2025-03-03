// server.js
import logger from "@project_root/logger";

Bun.serve({
  fetch(request) {
    logger.info(`Received request: ${request.method} ${request.url}`);
    return new Response("Hello, World!\n\nFrom: app_a", {
      headers: { "Content-Type": "text/plain" },
    });
  },
  port: 8080,
});
