# Task Manager Full-Stack Project

A complete full-stack web application built with React.js, Node.js, Express, MongoDB, and a RESTful API.

## Project Structure

- `backend/` - Express API server with MongoDB persistence
- `frontend/` - React application for the user interface

## Features

- Create, read, update, and delete tasks
- MongoDB data persistence via Mongoose
- REST API routes with Express
- React frontend with Axios API integration
- Clean, responsive UI for task management

## Setup

1. Install backend dependencies:

```powershell
cd backend
npm install
```

2. Install frontend dependencies:

```powershell
cd ..\frontend
npm install
```

3. Create a `.env` file in `backend/` with your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/task-manager
PORT=5000
```

4. Start backend server:

```powershell
cd ..\backend
npm run dev
```

5. Start frontend app:

```powershell
cd ..\frontend
npm start
```

## Production build and deployment

1. Build the React app for production:

```powershell
cd ..\frontend
npm run build
```

2. Start the backend server and serve the production bundle:

```powershell
cd ..\backend
npm start
```

3. Use MongoDB Atlas or another hosted MongoDB service for live deployment. Set the connection string in `backend/.env`:

```env
MONGODB_URI=<your-mongodb-atlas-connection-string>
PORT=5000
```

4. If you deploy the backend and frontend together on one host, the frontend bundle will be served from the backend and API requests will use the same domain.

### Deploying live

#### Render deployment (frontend + backend)

1. Push this repo to GitHub, GitLab, or Bitbucket.
2. Create a Render account and connect the repository.
3. Use the included `render.yaml` at the repo root to define both services.

For `task-manager-backend` on Render:
- Build command: `cd backend && npm install`
- Start command: `cd backend && npm start`
- Environment variables:
  - `MONGODB_URI` = your Atlas connection string
  - `PORT` = `5000` (optional)

For `task-manager-frontend` on Render:
- Build command: `cd frontend && npm install && npm run build`
- Publish path: `frontend/build`
- Environment variables:
  - `REACT_APP_API_URL` = `https://task-manager-backend.onrender.com/api`

> Replace `task-manager-backend.onrender.com` with the backend service URL Render gives you after deployment.

#### Important security note

- Do not commit your MongoDB URI, GitHub password, or any other secrets to the repository.
- Do not store your MongoDB connection string in `render.yaml`.
- Use Render's environment variables panel to manage `MONGODB_URI` securely.
- Connect Render to your GitHub account directly; the GitHub password itself is never needed in the repo.

#### MongoDB requirements

- You need a MongoDB database instance.
- For local development, install MongoDB locally or use `mongodb://127.0.0.1:27017/task-manager`.
- For production, use a hosted MongoDB Atlas cluster and keep the connection string secret.

## API Endpoints

- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Notes

- Use MongoDB Atlas or local MongoDB for persistence.
- The frontend is configured to call `/api` by default in production, and uses `REACT_APP_API_URL` if set.
