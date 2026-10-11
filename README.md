# Digital Transformation Platform for Student Activity Points & Club Management

A modern platform that helps colleges automate student activity point tracking, club and event management, and event reporting. It supports multi-role access for Deans, Counsellors, Students, and Organizers while centralizing attendance, feedback, reports, and analytics.

## Key Features

- Multi-role dashboards for Dean, Counsellor, Student, and Organizer access
- Automated student activity point tracking for event participation
- Club registration, event creation, attendance, and approval flows
- Event report generation with uploaded media and structured details
- Real-time analytics for counsellors to identify disengaged students
- Secure authentication using JWT tokens and role-based middleware
- Media uploads supported via Cloudinary and Supabase storage

## Project Structure

- `backend/` � Express.js API server with MongoDB, MySQL, Supabase, and Cloudinary integration
- `frontend/` � React application built with Create React App

## Technologies

- Backend: Node.js, Express, MongoDB, MySQL, Mongoose, JWT, Cloudinary, Supabase
- Frontend: React, React Router, Styled Components, Axios

## Setup and Run

### 1. Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with values similar to:
   ```env
   PORT=5000
   MONGODB_URL=mongodb://localhost:27017
   MYSQL_HOST=localhost
   MYSQL_DATABASE=project
   MYSQL_USER=root
   MYSQL_PASSWORD=
   ACCESS_TOKEN_SECRET=your_jwt_access_secret
   REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server uses `backend/src/index.js` and listens on `process.env.PORT`.

### 2. Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

The frontend runs on `http://localhost:3000` by default.

## Environment Notes

### Backend environment variables

The backend expects the following variables in `backend/.env`:

- `PORT` � port for the backend server
- `MONGODB_URL` � MongoDB connection base URL
- `ACCESS_TOKEN_SECRET` � JWT access token secret
- `REFRESH_TOKEN_SECRET` � JWT refresh token secret
- `ACCESS_TOKEN_EXPIRY` � access token expiry setting (example: `15m`)
- `REFRESH_TOKEN_EXPIRY` � refresh token expiry setting (example: `7d`)
- `SUPABASE_URL` � Supabase project URL
- `SUPABASE_ANON_KEY` � Supabase anon/public key

### Database configuration

- MongoDB database name is defined in `backend/src/constant.js` as `studentsClub`
- MySQL credentials are loaded from environment variables in `backend/src/db/index.js`:
  - `MYSQL_HOST`
  - `MYSQL_DATABASE`
  - `MYSQL_USER`
  - `MYSQL_PASSWORD`

If your MySQL setup differs, update `backend/.env` with your own credentials.

### Cloudinary

The backend’s Cloudinary upload helper is in `backend/src/utils/cloudinary.js`. It uses environment variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Do not store these credentials in source control.

## Available Backend Routes

The backend exposes routes under `/user` in `backend/src/routes/user.route.js`. It includes:

- Authentication and user management
- Club registration and club overview
- Event creation, registration, attendance, and approval
- Activity point viewing
- Automated report generation
- Role-based protected routes for Dean, Counsellor, and President

## Notes

- The frontend and backend are separate projects. Run each service in its own terminal.
- The backend uses CORS to allow requests from `http://localhost:3000`.
- Use `npm install` separately in `backend/` and `frontend/`.

