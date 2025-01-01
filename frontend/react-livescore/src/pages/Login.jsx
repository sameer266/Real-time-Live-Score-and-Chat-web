import React, { useState } from 'react';
import { LoginAuth } from '../authUtils/basic_auth/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../authUtils/redux_store/authSlice';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (msg) => toast.success(msg);

  const handleonSubmit = async (e) => {
    e.preventDefault();
    setError(false); // Reset error state

    const response = await LoginAuth(username, password);
    console.log("Login Response:", response);

    if (response.success) {
      // Show success notification
      notify("Login Success");

      const username = response.username;
      localStorage.setItem('isAuthenticated', true); // Set authentication state
      localStorage.setItem('username', username); // Store username
      dispatch(login(username));

      // Delay navigation to allow the notification to show
      setTimeout(() => {
        navigate('/dashboard'); // Navigate to the dashboard after 2 seconds
      }, 2000); // 2 seconds delay for the toast notification
    } else {
      setError(true); // Display error message
      setPassword(''); // Clear password input field after error
    }
  };

  return (
    <div className="login-container">
      <ToastContainer autoClose={2000} draggable={false} />
      <div className="login-content">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">Invalid Username or Password</p>}
        <form onSubmit={handleonSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
