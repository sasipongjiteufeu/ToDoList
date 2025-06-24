import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // IMPORTANT: Replace with your actual Nest.js API endpoint
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: formData.username,
        password: formData.password,
      });

    
      // --- The Important Part ---
      // Your API should return a token on successful login.
      const { access_token  } = response.data;

      // Store the token in localStorage. This is the most common method.
      // You can also use sessionStorage or cookies.
      localStorage.setItem('token', access_token );

      console.log('Login successful, token stored!');

      // Redirect user to a protected dashboard or home page
      // We will create this page in the "Next Steps" section.
      navigate('/todos'); 

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Check your credentials.';
      setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        <p className="switch-auth">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;