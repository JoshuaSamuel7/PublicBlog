import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = ({setUser}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/register', { name, username, password })
      .then(response => {
        setUser(response.data.user); // Assume backend sends user data
        navigate("/");
      })
      .catch(error => {
        setError('Signup failed, please try again');
        console.error('Signup error', error);
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Already have an account? <a href="/login">Login here</a></p>
      </form>
    </div>
  );
};

export default Signup;
