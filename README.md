# User Address Management

A small admin tool for viewing and modifying user profiles and their addresses. Built as a take-home exercise: a Spring Boot API backed by an in-memory store, and a React + MUI frontend with a user list and a per-user detail/address management page.

| Users list | User detail |
| --- | --- |
| ![Users list page](docs/images/home.png) | ![User detail page](docs/images/user.png) |

## Stack

- **Backend:** Java 17, Spring Boot 4 (Web MVC + Validation), in-memory repositories (no database)
- **Frontend:** React 19, TypeScript, Vite, MUI 9, TanStack Router, TanStack Query, React Hook Form + Zod, Axios

## Project structure

```
apps/
  api/   Spring Boot backend (apps/api)
  web/   React + MUI frontend (apps/web)
```

## Setup

### Prerequisites

- Java 17+
- [Bun](https://bun.sh) (used to install and run the frontend)

### 1. Run the backend

```bash
cd apps/api
./mvnw spring-boot:run
```

The API starts on `http://localhost:8080`. Data is seeded in memory on startup (`UserDataSeeder`) and resets on restart: there's no database to configure.

### 2. Run the frontend

```bash
cd apps/web
bun install
bun run dev
```

The app starts on `http://localhost:5173`. The Vite dev server proxies any request to `/api/*` through to `http://localhost:8080/*` (see `apps/web/vite.config.ts`), so the two run on different ports with no CORS setup needed.

Open `http://localhost:5173` and you should see the users list.

### Other frontend scripts

```bash
bun run build         # type-check + production build
bun run lint           # eslint
bun run format:check   # prettier check
```

## API overview

All endpoints are under `/users` and return/accept JSON.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/users` | List all users (with their addresses) |
| GET | `/users/{id}` | Get one user |
| POST | `/users` | Create a user |
| PATCH | `/users/{id}` | Partially update a user (email/first/last name) |
| DELETE | `/users/{id}` | Delete a user |
| GET | `/users/{userId}/addresses` | List a user's addresses |
| POST | `/users/{userId}/addresses` | Add an address to a user |
| PATCH | `/users/{userId}/addresses/{id}` | Partially update an address |
| DELETE | `/users/{userId}/addresses/{id}` | Delete an address |
| PATCH | `/users/{userId}/addresses/{id}/primary` | Mark an address as the user's primary address |

A `User` is `{ id, email, firstName, lastName, addresses: Address[] }`; an `Address` is `{ id, label, street, city, state, postalCode, country, primary }`. Addresses are always nested under their user: every address route is scoped by `userId`, which is what the frontend's "User → Address" flow is built around (see below).

Each user always has exactly one primary address once they have any addresses: the first address created for a user is automatically made primary, deleting the primary promotes another address, and `.../primary` is the only way to change it. Errors come back as JSON with a `404` for missing users/addresses and `400` for validation failures.

## Design notes: the User → Address flow

- **Nesting mirrors the domain.** Since an address only ever exists in the context of a user (a 1-to-many relationship), the API models addresses as a sub-resource of users (`/users/{userId}/addresses/...`) instead of a top-level `/addresses` endpoint. This keeps the API contract self-documenting and means the frontend never has to juggle an address without also knowing whose it is.
- **List → Detail as the only navigation path.** The users list (`/`) shows just enough to identify someone: avatar, name, email, primary address: and every address action lives one click away on the user's detail page (`/user/:id`), reached by clicking their name. This keeps the list page lightweight and puts full address CRUD (add/edit/delete/set-primary) in one focused place rather than spreading it across modals on the list page.
- **A quick-edit escape hatch on the list.** The list page's row-level "Edit" also lets an admin swap which existing address is primary, without leaving the list: useful for the common case, while anything address-detail-shaped (adding, editing, deleting an address) requires the full detail page.
- **Primary address is enforced, not just conventional.** The backend guarantees exactly one primary once a user has addresses (auto-assigned on first add, auto-reassigned on delete). The frontend leans on that guarantee in the UI: the actions menu hides "Make primary" and "Delete" on whichever address is currently primary, since deleting or re-flagging it isn't a meaningful action.
- **Re-fetch after mutation, not optimistic patching.** After an address or profile mutation, the detail page re-fetches the full user rather than hand-patching local state. It costs one extra round trip per action, but with an in-memory backend that's cheap, and it keeps the UI provably in sync with the server instead of trusting a hand-rolled merge.
- **Routing.** TanStack Router's file-based routes give `/` (list) and `/user/$id` (detail) clean, typed navigation: the detail route is keyed by `id` so navigating from one user's page directly to another's remounts the section instead of reusing stale state.
