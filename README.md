# Bun Monorepo Template

This repository is a template for a monorepo setup using [Bun](https://bun.sh/). It’s designed to help you quickly spin up multiple apps that share common code (such as a logger or database modules) while leveraging Bun's fast performance and built-in bundling capabilities.

## What is Bun?

[Bun](https://bun.sh/) is a modern JavaScript runtime similar to Node.js or Deno but with a focus on speed and developer ergonomics. Some of its key advantages include:

- **High Performance:** Bun is written in Zig and is highly optimized for speed.
- **Built-in Tooling:** It comes with an integrated bundler, transpiler, package manager, and more.
- **Simplicity:** With less configuration and faster startup times, Bun makes developing and deploying apps more efficient.

## Project Structure

The monorepo template is organized into three main sections:

- **apps/** Contains individual applications. For example, `app_a` and `app_b` each have their own `package.json` and source files.
- **shared/** Holds shared modules or libraries used across multiple apps. For instance:
  - `shared/logger` – a shared logging module.
  - `shared/database` – a shared database utility.
- **Root Files** Global configuration files such as the root-level `package.json`, `.gitignore`, etc.

## Getting Started

### Prerequisites

- [Bun installed](https://bun.sh/) (this template was built using Bun v1.2.2)
- Git

### Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:magnet-cre/bun-monorepo-template.git
   cd bun-monorepo-template
   ```

2. **Install Dependencies**

   At the root of the monorepo, run:

   ```bash
   bun i
   ```

   This installs dependencies for both the individual apps and shared modules.

## Running the Apps in Development

To run an app (for example, `app_a`) in development mode with live-reloading:

1. Change into the app’s directory:

   ```bash
   cd apps/app_a/
   ```

2. Start the development server:

   ```bash
   bun run dev
   ```

   You should see log output similar to:

   ```
   2025-03-02 19:36:37 [info]: Received request: GET http://localhost:8080/
   ```

   This command watches for changes, automatically rebuilds, and reloads the app.

## Building the Apps for Production

To build your application (e.g., `app_a`) for production:

1. Ensure you are in the app’s directory:

   ```bash
   cd apps/app_a/
   ```

2. Run the build command:

   ```bash
   bun run build
   ```

   This bundles your app (e.g., `src/server.js`) into a production-ready output in the `dist` folder. Example output might include:

   ```bash
   $ bun build src/server.js --outdir dist --minify --target bun
   ./server.js 152.34 KB
   [15ms] bundle 124 modules
   ```

## Additional Tips

### Shared Modules

Use the `shared` folder to centralize common utilities like your logger. For example, `apps/app_a/src/server.js` imports the logger with:

```javascript
import logger from "@project_root/logger";
```

Ensure the module alias (e.g., `@project_root/logger`) is properly resolved by your Bun configuration.

### Environment Files

Place environment-specific configurations in a `.env` file in each app directory.

### Monitoring and Logging

The included logger is used to log incoming HTTP requests. Adjust the logger configuration in `shared/logger/src/index.js` as needed.

## Conclusion

This template provides a robust starting point for developing and managing multiple applications using Bun. Its monorepo structure encourages code reuse, and Bun’s integrated tooling helps streamline both development and deployment processes. Feel free to expand upon this template as your project requirements grow.

**Happy coding!**
