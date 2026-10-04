# Notes API

A very simple, beginner-friendly REST API for managing notes. Built to learn **Drizzle ORM, middleware, REST APIs and CRUD**.

## Features

- Create, read, update and delete notes
- Request validation with AJV (built into Fastify)
- Simple logger middleware (method, URL, timestamp)
- Simple error-handling middleware with a consistent response shape
- Database migrations with Drizzle Kit

## Tech Stack

Node.js, Fastify, TypeScript, Drizzle ORM, PostgreSQL, AJV, dotenv

## Project Structure

```text
notes-api/
├── src/
│   ├── db/
│   │   ├── index.ts          # connects Drizzle to PostgreSQL
│   │   └── schema.ts         # the "notes" table
│   ├── routes/
│   │   └── note.routes.ts    # URLs + validation rules
│   ├── controllers/
│   │   └── note.controller.ts# CRUD logic using Drizzle
│   ├── middleware/
│   │   ├── logger.ts         # logs every request
│   │   └── errorHandler.ts   # formats errors
│   └── server.ts             # starts the app
├── drizzle/                  # generated migration files (commit these)
├── .env.example
├── drizzle.config.ts
├── package.json
└── tsconfig.json
```

## Database Setup

1. Install PostgreSQL and make sure it is running.
2. Create a database:

```bash
psql -U postgres -c "CREATE DATABASE notes_db;"
```

## Installation

```bash
git clone <your-repo-url>
cd notes-api
npm install
```

## Environment Variables

```bash
cp .env.example .env
```

Then edit `.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/notes_db
PORT=5000
```

## Migration Commands

```bash
npm run db:generate   # create a migration file from src/db/schema.ts
npm run db:migrate    # apply migrations to the database
npm run db:studio     # optional: browse your data in the browser
```

Run `db:generate` again whenever you change `schema.ts`, then `db:migrate`.

## Running Locally

```bash
npm run dev
```

Server starts at `http://localhost:5000`.

For a production-style run:

```bash
npm run build
npm start
```

## API Endpoints

| Method | URL              | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/api/notes`     | Create a note      |
| GET    | `/api/notes`     | Get all notes      |
| GET    | `/api/notes/:id` | Get one note       |
| PUT    | `/api/notes/:id` | Update a note      |
| DELETE | `/api/notes/:id` | Delete a note      |

Success response: `{ "success": true, "data": { ... } }`
Error response: `{ "success": false, "message": "Note not found" }`

## Example Requests

Create:

```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Python","content":"Practice loop operations."}'
```

Get all:

```bash
curl http://localhost:5000/api/notes
```

Get one:

```bash
curl http://localhost:5000/api/notes/1
```

Update:

```bash
curl -X PUT http://localhost:5000/api/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Drizzle well"}'
```

Delete:

```bash
curl -X DELETE http://localhost:5000/api/notes/1
```

Missing field example (returns `400`):

```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"No content"}'
```
## Future Improvements

- Pagination and search for notes
- Authentication (users own their notes)
- Automated tests
- Swagger / OpenAPI docs
- Run migrations automatically on deploy
