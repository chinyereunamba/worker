# service-worker

A small Bun-based worker project. This repository contains a minimal worker entrypoint and supporting files to run and iterate quickly with Bun.

## Requirements
- Bun v1.1.38 (or newer)
- A POSIX-compatible shell (macOS / Linux / WSL)

## Install
Install dependencies:
```bash
bun install
```

## Run
Run the project (entrypoint is index.ts):
```bash
bun run src/index.ts
```

If your project defines a `start` script in package.json you can also use:
```bash
bun run start:worker
```

## Project layout (typical)
- index.ts — main entrypoint that starts the worker
- src/ or worker/ — worker implementation and helpers
- public/ — static assets (if applicable)
- package.json — scripts and metadata
- README.md — this file

Adjust paths above to match the actual files in this folder.

## Development tips
- Use bun's fast startup for iterative development.
- Keep environment values in a `.env` file and load them in your code as needed.
- Add a `watch` script (or use a file watcher) to restart the process automatically during development.

## Contributing
Open issues or pull requests with concise descriptions of changes. Include repro steps for bugs.

## License

A license has been added to this project. See the LICENSE file and the "license" field in package.json for the exact terms.

Quick checks:
- View the license text: cat LICENSE
- See the package.json value: grep '"license"' package.json || jq -r .license package.json

