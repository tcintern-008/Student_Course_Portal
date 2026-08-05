# Student Course Portal API

A small Express.js REST API for the Student Course Portal, built to learn Node.js and Express fundamentals (routing, middleware, request/response, route & query params).

This is a separate learning project from the Next.js frontend in the root of this repo — it's not wired up to it yet. Right now it just serves the same course/instructor data over HTTP instead of importing it directly.

## Run it

```bash
cd server
npm install
npm start
```

Server runs on `http://localhost:5000` by default.

For auto-restart on file changes during development:
```bash
npm run dev
```

## Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/api/courses` | All courses. Supports `?level=` and `?search=` query params |
| GET | `/api/courses/:slug` | Single course by slug |
| GET | `/api/courses/:slug/related` | Related courses. Supports `?limit=` query param |
| GET | `/api/instructors` | All instructors. Supports `?course=` query param |
| GET | `/api/instructors/:id` | Single instructor by id |

Unknown routes return a `404` with a JSON message.

## Structure

```
server/
  index.js              entry point, sets up middleware & routes
  routes/                route definitions
  controllers/            route handler logic
  data/                   in-memory course/instructor data
  middleware/logger.js    logs each incoming request
```

## Notes

No database yet — data lives in plain JS files in `data/`. That'll come later once we get to the database part of the track.
