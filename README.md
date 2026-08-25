# User Address Administration

A small administrator application for maintaining user profiles and their ordered
address lists. The Spring Boot API uses seeded, in-memory data; changes last until
the backend process restarts.

## Requirements

- Java 17+
- Maven 3.9+
- Node.js 20.19+ (or 22.12+)
- npm 10+

## Start

Run the API from the repository root:

```bash
mvn -pl backend spring-boot:run
```

In another terminal, install and run the web application:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to the backend on
`http://localhost:8080`. The API also permits browser requests from the standard
Vite localhost origins.

## Test and build

```bash
# Backend tests and executable jar
mvn test
mvn package

# Frontend checks and production bundle
cd frontend
npm run lint
npm run build
```

Generated `target`, `node_modules`, and `dist` directories are ignored by Git.

## REST API

All request and response bodies use `application/json`.

| Method | Path | Result |
| --- | --- | --- |
| `GET` | `/api/users` | User summaries, including `addressCount` |
| `GET` | `/api/users/{id}` | Full profile and ordered `addresses` |
| `PUT` | `/api/users/{id}` | Updated full user detail |
| `POST` | `/api/users/{id}/addresses` | `201` with the created address and `Location` header |
| `PUT` | `/api/users/{id}/addresses/{addressId}` | Updated address |
| `DELETE` | `/api/users/{id}/addresses/{addressId}` | `204 No Content` |

Profile request:

```json
{
  "email": "maya.chen@example.com",
  "firstName": "Maya",
  "lastName": "Chen"
}
```

Address create/update request:

```json
{
  "label": "Home",
  "line1": "18 Garden Street",
  "line2": "Apartment 4B",
  "city": "Portland",
  "state": "Oregon",
  "postalCode": "97205",
  "country": "United States"
}
```

`line2` may be `null` or blank; all other fields are required. Invalid requests
return `400`, and unknown users or addresses return `404`. Errors have a stable
JSON shape:

```json
{
  "timestamp": "2026-08-25T12:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Request validation failed",
  "path": "/api/users/1",
  "fieldErrors": {
    "email": "must be a well-formed email address"
  }
}
```

## Design choices

- A synchronized in-memory service keeps the demo deterministic without adding
  database setup; `LinkedHashMap` and address lists preserve display order.
- API DTOs separate JSON contracts and validation from mutable domain objects.
- The React client uses browser `fetch`, local component state, abortable reads,
  and immutable updates after mutations—no global state library is needed.
- Editing is intentionally scoped to one address at a time, while destructive
  deletion requires confirmation. Responsive table/card layouts keep the same
  workflows usable on small screens.
