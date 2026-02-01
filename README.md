# Student Application System

A full-stack MERN (MongoDB, Express, React, Node.js) web application designed to streamline the student course registration process. It features a public-facing registration form for students and a secure dashboard for administrators to manage applications.

## Project Structure

The repository is organized into two main directories:

- **`backend/`**: The server-side application handling API requests, database connections, and authentication.
- **`frontend/studentform/`**: The client-side React application providing the user interface.

## Features

- **Student Portal**:
  - User-friendly registration form.
  - Photo upload capability.
  - Real-time input validation.
- **Admin Dashboard**:
  - Secure JWT-based authentication.
  - Overview statistics (Total, Accepted, Pending).
  - Advanced search and pagination for student records.
  - Actions to View, Edit, Delete, or Update status of applications.

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (Local instance or Atlas account)

## Quick Start Guide

Follow these steps to get the application running locally.

### 1. Setup Backend

```bash
cd backend
npm install
# Create a .env file with PORT, MONGO_URI, and JWT_SECRET
npm start
```
*Server runs on http://localhost:5000*

### 2. Setup Frontend

Open a new terminal window:

```bash
cd frontend/studentform
npm install
npm run dev
```
*Client runs on http://localhost:5173*

## Documentation

For detailed instructions on each part of the system, refer to the specific README files:

- Backend Documentation
- Frontend Documentation