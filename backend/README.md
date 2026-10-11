# Backend Service - Digital Transformation Platform

This backend powers the student activity tracking and club management platform.
It is an Express.js API server that connects to MongoDB, MySQL, Supabase, and Cloudinary.

## Overview

- Main entry point: `src/index.js`
- API routes mounted under `/user`
- Uses JWT-based authentication and role-based middleware
- Handles club/event registration, attendance, activity points, and report generation

## Setup

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` 
4. Start the backend server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT` � backend server port
- `MONGODB_URL` � MongoDB connection URL
- `MYSQL_HOST`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` � MySQL access
- `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` � JWT secret keys
- `ACCESS_TOKEN_EXPIRY` / `REFRESH_TOKEN_EXPIRY` � token expiry values
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` � Supabase storage connection
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` � Cloudinary upload credentials



## Useful Files

- `src/index.js` � server startup and database connection logic
- `src/app.js` � middleware and route setup
- `src/db/index.js` � MongoDB and MySQL connection logic
- `src/routes/user.route.js` � main API route definitions
- `src/utils/supabaseClient.js` � Supabase client initialization
- `src/utils/cloudinary.js` � Cloudinary upload helper


