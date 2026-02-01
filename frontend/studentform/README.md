# Student Application System - Frontend

This is the frontend client for the Student Application System, built with React and Bootstrap. It provides a user-friendly interface for students to apply for courses and for administrators to manage applications.

## Features

### Public Access
- **Home Page**: Landing page with institution details and quick links.
- **Course Listing**: Browse available Engineering, Bachelor's, and Post-Graduation courses.
- **Student Registration**: Comprehensive application form with:
  - Real-time validation (Mobile, Email, DOB).
  - Photo upload support.
  - Categorized course selection.
- **Admin Login**: Secure login page for administrators.

### Admin Dashboard (Protected)
- **Overview Stats**: View total applications, accepted students, and pending requests.
- **Application Management**:
  - **Search**: Real-time search by name or email (with debouncing).
  - **Pagination**: Navigate through large lists of students.
  - **Status Toggle**: One-click update for application status (Pending/Accepted).
  - **Actions**: View full details, Edit student info, or Delete records.
- **Detailed View**: Modal popup showing complete student profile including photo and address.

## Tech Stack

- **Framework**: React (Vite)
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5
- **Notifications**: React Toastify

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

## Installation & Setup

1.  **Navigate to the project directory:**
    ```bash
    cd frontend/studentform
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Access the application:**
    Open your browser and go to `http://localhost:5173` (default Vite port).

## Configuration

The application communicates with a backend server. By default, it expects the backend to be running at:
`http://localhost:5000`

If your backend runs on a different port or domain, update the `API_URL` constant found in:
- `src/Dashboard.jsx`
- `src/Register.jsx`
- `src/Login.jsx`