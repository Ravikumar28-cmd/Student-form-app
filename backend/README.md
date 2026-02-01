# Student Application System - Backend

This is the backend server for the Student Application System, built with Node.js, Express, and MongoDB. It handles API requests, database operations, user authentication, and file uploads.

## Features

- **RESTful API**: Provides endpoints for student registration, management, and retrieval.
- **Authentication**: Admin login using JWT (JSON Web Tokens).
- **File Upload**: Handles student photo uploads using Multer.
- **Database**: Stores student records and admin credentials in MongoDB.
- **Search & Pagination**: Optimized data retrieval for the frontend dashboard.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Token (JWT)
- **File Handling**: Multer
- **CORS**: Cross-Origin Resource Sharing enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local instance or Atlas connection string)

## Installation & Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of the `backend` folder and add the following configuration:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/studentdb
    JWT_SECRET=your_super_secret_key_here
    ```
    *Note: Update `MONGO_URI` if you are using MongoDB Atlas.*

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/students/login`: Admin login. Returns a JWT token.

### Student Management
- `POST /api/students/apply`: Register a new student (Multipart form data for photo upload).
- `GET /api/students`: Get a paginated list of students. Supports query params:
  - `page`: Page number (default 1).
  - `limit`: Items per page (default 10).
  - `search`: Search term for name or email.
- `PUT /api/students/:id`: Update an existing student's details.
- `DELETE /api/students/:id`: Delete a student record.
- `PUT /api/students/status/:id`: Toggle student status (e.g., Pending to Accepted).