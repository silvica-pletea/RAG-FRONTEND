# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` / `ng serve` — dev server at `http://localhost:4200`
- `ng build` — production build to `dist/` (default config is `production`)
- `ng build --watch --configuration development` — rebuild on change
- `npm test` / `ng test` — run unit tests (Vitest via `@angular/build:unit-test`)
- Run a single spec: `ng test --include src/app/app.spec.ts` (no e2e framework is configured)

## Architecture

Angular 21 standalone-component app (no NgModules), zoneless-style with signals throughout. The frontend talks to a RAG backend at `http://localhost:8000` (hardcoded as `#apiUrl` in each feature service).

**Bootstrap:** `main.ts` → `appConfig` (`app.config.ts`). `appConfig` wires the router, `HttpClient` with two functional interceptors, and a custom `GlobalErrorHandler`. The root `App` component hosts `<router-outlet>` plus the always-present `Loading` and `ErrorList` overlays.

**Routing is minimal:** the only route (`/`) renders `Home`, which is a tabbed shell (`@angular/aria/tabs`) switching between the three feature components — `UploadFile`, `SearchFile`, `Chat`.

**Cross-cutting HTTP/error/loading flow:**
- `httpLoadingInterceptor` increments/decrements a counter in `LoadingService`; `isLoading` is a computed signal driving the global spinner. Requests opt out by setting the `SKIP_SPINNER` `HttpContextToken` (see `shared/constants/constants.ts`) — the chat request does this so it shows its own inline loading state instead.
- `httpErrorInterceptor` routes every HTTP error to `ErrorService.handleHttpError`, then re-throws.
- `GlobalErrorHandler` routes non-HTTP runtime errors to `ErrorService.handleGlobalError` (it ignores `HttpErrorResponse` to avoid double-reporting).
- `ErrorService` holds errors in a signal, assigns each a `crypto.randomUUID()`, and auto-dismisses after 5s via tracked `setTimeout` timers (cleaned up on `DestroyRef.onDestroy`). `ErrorList`/`ErrorItem` render them.

**Feature pattern:** each feature under `src/app/features/<name>/` owns its component, `services/`, and `models/`. Feature-scoped services (`UploadService`, `UploadedFilesService`) are provided in the component's `providers` array (per-instance), while app-wide services (`RagService`, `ErrorService`, `LoadingService`) use `providedIn: 'root'`. State lives in private `#signal`s exposed read-only via `.asReadonly()` / `computed()`; subscriptions use `takeUntilDestroyed(this.#destroyRef)`.

Backend endpoints used: `POST /chat`, `POST /files/upload` (multipart, progress events), `GET /files`, `DELETE /files/delete/:name`.

## Conventions

- Private class members use the `#private` field syntax (e.g. `#httpClient`, `#messages`).
- Prefer signals + `inject()` over constructor injection and RxJS state. Components use `ChangeDetectionStrategy.OnPush`.
- Shared signal helper `updateProperty(signal, key, value)` in `shared/utils.ts` for immutable single-field updates.
- No emojis in code, logs, or print statements.
