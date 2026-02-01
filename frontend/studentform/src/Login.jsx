import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    fetch('http://localhost:5000/api/students/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', 'true'); // Optional: keep for UI logic
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Invalid Credentials!');
        setIsLoading(false);
      }
    })
    .catch(err => {
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    });
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card login-card shadow-lg p-4 p-md-5">
        <div className="text-center mb-4">
          <div className="login-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </div>
          <h2 className="fw-bold text-dark">Welcome Back</h2>
          <p className="text-muted small">Enter your credentials to access the admin panel.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold shadow-sm" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing In...
              </>
            ) : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
