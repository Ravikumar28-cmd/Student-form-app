import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Dashboard from './DAshboard'
import Courses from './Courses'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div className="text-center mt-5"><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      </div>
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Student Application System. All rights reserved.</p>
          <small className="text-white-50">Empowering Education Everywhere</small>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App
