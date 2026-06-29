# Lightweight RAG Frontend

A lightweight RAG (Retrieval-Augmented Generation) frontend built with Angular 21 standalone components and signals. It provides the UI for uploading source files, browsing them, and chatting against the indexed content.

The backend it talks to is the **RAG-BACKEND** app, located here: https://github.com/silvica-pletea/RAG-BACKEND.git. By default the frontend expects the backend at `http://localhost:8000`.

## Structure

```text
src/app/
├── core/
│   ├── handlers/
│   │   └── global-error-handler.ts      # Routes non-HTTP runtime errors to ErrorService
│   └── interceptors/
│       ├── http-error-interceptor.ts    # Routes HTTP errors to ErrorService, then re-throws
│       └── http-loading-interceptor.ts  # Drives the global spinner (SKIP_SPINNER opts out)
├── features/
│   ├── chat/                            # Chat UI and RagService (POST /chat)
│   ├── home/                            # Tabbed shell switching between the three features
│   ├── search-file/                     # List and delete files (GET /files, DELETE /files/delete/:name)
│   └── upload-file/                     # Upload with progress (POST /files/upload)
├── shared/
│   ├── components/                      # ErrorList, ErrorItem, Loading overlays
│   ├── constants/                       # SKIP_SPINNER HttpContextToken
│   ├── models/                          # Shared interfaces (ErrorDetails)
│   ├── services/                        # App-wide ErrorService and LoadingService
│   └── utils.ts                         # Shared signal/error helpers
├── app.config.ts                        # Wires router, HttpClient interceptors, GlobalErrorHandler
├── app.routes.ts                        # Routing (only `/` renders Home)
└── app.ts                               # Root component hosting router-outlet + overlays

src/environments/
├── environment.ts                       # Default (production) config — apiUrl baked into the build
└── environment.development.ts           # Dev override, swapped in via angular.json fileReplacements
```

Import the active config anywhere via the `@environments/environment` alias.

### IMPORTANT

This setup is intended for local development and testing only. Do not use this code as-is in production environments.

The backend keeps chat history in a single in-memory instance shared by all requests, so the app is effectively single-user and history is lost on restart.

# Quick Start – From Zero to Working Frontend

## 1. Clone the repository

```bash
git clone https://github.com/silvica-pletea/RAG-FRONTEND.git
cd RAG-FRONTEND
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the backend

The frontend needs the **RAG-BACKEND** app running at `http://localhost:8000`. Clone and start it from https://github.com/silvica-pletea/RAG-BACKEND.git (see its README for setup).

## 4. Start the development server

```bash
ng serve
```

Once the server is running, open `http://localhost:4200/` in your browser. The application will automatically reload whenever you modify any of the source files.

## 5. Build for production

```bash
ng build
```

This compiles the project and stores the build artifacts in the `dist/` directory, optimized for performance and speed.

## 6. Run unit tests

```bash
ng test
```

Unit tests run with the [Vitest](https://vitest.dev/) test runner. No end-to-end testing framework is configured.

## npm scripts

Convenience scripts that pin the build/serve configuration explicitly:

| Script | Command | Description |
| --- | --- | --- |
| `npm run start:dev` | `ng serve --configuration=development` | Serve with the development config (`apiUrl` → `http://localhost:8000`) |
| `npm run start:prod` | `ng serve --configuration=production` | Serve with the production config (`apiUrl` → `http://localhost:8001`) |
| `npm run build:dev` | `ng build --configuration=development` | Build with the development config (unoptimized, source maps) |
| `npm run build:prod` | `ng build --configuration=production` | Build with the production config (optimized, hashed output) |

`npm start` / `ng serve` defaults to the development config, and `npm run build` / `ng build` defaults to production.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
