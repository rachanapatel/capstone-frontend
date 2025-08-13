// import React from 'react';
// import { Link } from 'react-router-dom';

// const Homepage = () => {
//   return (
//     <div className="homepage">
//       <h1>Welcome to NextShift</h1>
//       <p>We meet your scheduling needs.</p>
//       <div>
//         <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
//       </div>
//     </div>
//   );
// };

// export default Homepage;






import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <Link to="/login" className="btn btn-outline">Sign In</Link>
        <Link to="/register" className="btn btn-filled">Get Started</Link>
      </header>

      <main className="homepage-main">
        <h1>Welcome to NextShift</h1>
        <p>We meet your scheduling needs</p>
        <Link to="/register" className="btn btn-filled main-cta">Get Started</Link>
      </main>
    </div>
  );
};

export default Homepage;
