# T&H Cricket Academy (Monorepo)

This repository contains the T&H Cricket Academy website built using React, TypeScript, Express, and MySQL.

## Project Structure

```text
th-cricket/
├── client/     # React + TypeScript + Vite frontend
├── server/     # Express + TypeScript backend
```

---

## Prerequisites

Install the following:

### Node.js

Download:

https://nodejs.org

Verify installation:

```bash
node -v
npm -v
```

### Git

Verify installation:

```bash
git --version
```

---

## Clone the Repository

```bash
git clone <repository-url>
cd th-cricket
```

---

## Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Backend Setup

Open a new terminal:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:4000
```

---

## Database Setup (Railway)

The project uses a shared Railway MySQL database.

### Create a .env file

Inside the server folder create:

```text
server/.env
```

Add the Railway database credentials:

```env
DB_HOST=acela.proxy.rlwy.net
DB_PORT=44846
DB_USER=root
DB_PASSWORD=<ask project owner>
DB_NAME=railway
```

For security reasons, the database password is not stored in GitHub. Contact the project owner for the current password.

---

## Verify Database Connection

Start the backend:

```bash
npm run dev
```

Open:

```text
http://localhost:4000/api/coaches
```

You should see JSON data returned from the database.

Example:

```json
[
  {
    "id": 1,
    "name": "Tom Rogers"
  }
]
```

---

## Verify Frontend Connection

Open:

```text
http://localhost:5173
```

Navigate to the Coaches section.

Coach information should load directly from the shared Railway database.

---

## Shared Database Access

All team members use the same Railway database.

This means:

* Adding a coach updates the database for everyone.
* Editing a coach updates the database for everyone.
* Deleting a coach updates the database for everyone.
* Changes appear immediately without needing to export/import SQL files.

---

## Daily Workflow

Pull the latest changes:

```bash
git pull
```

Start frontend:

```bash
cd client
npm run dev
```

Start backend:

```bash
cd server
npm run dev
```

---

## Common Issues

### Cannot connect to database

Check:

```env
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
```

are correct.

### CORS Error

Ensure the backend includes:

```ts
app.use(cors())
```

### API not returning data

Visit:

```text
http://localhost:4000/api/coaches
```

If data appears here but not on the frontend, check the frontend fetch URL.
