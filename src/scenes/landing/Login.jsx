import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("handleLogin called", { username, password });
  
    try {
      console.log("Sending axios request...");
      const response = await axios.post('http://localhost:8000/login/', {
        username,
        password
      });
      console.log("Axios response:", response.data);
  
      const user = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dash");
  
    } catch (err) {
      console.error("Login error:", err);
  
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
  
        if (err.response.status === 401) {
          setError(err.response.data.detail || "Invalid username or password");
        } else {
          setError(`Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("No response from server. Is it running?");
      } else {
        console.error("Axios config error:", err.message);
        setError("Request setup error.");
      }
    }
  };
  
  

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
