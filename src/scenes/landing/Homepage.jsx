import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to NextShift</h1>
      <p>We meet your scheduling needs.</p>
      <div>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Homepage;
