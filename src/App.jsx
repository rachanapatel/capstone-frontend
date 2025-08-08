// import { useState } from 'react'
import './App.css'
import Header from './scenes/global/Header';
import Sidebar from './scenes/global/Sidebar';
// import { Routes, Route } from "react-router-dom";
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Homepage from './scenes/landing/Homepage';
import Login from './scenes/landing/Login';
import CompanyRegistration from './scenes/landing/CompanyRegistration';
// App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
export const URL = 'https://ets-trial-backend.onrender.com';


// function App() {
//   const [isSidebar, setIsSidebar] = useState(true);
//   return (
//   <div className="app">
//     <div className="Landing">
//       <Routes>
//         <Route path="/check" element={<Homepage />} />
//         {/* <Route path="/register" element={<CompanyRegistration />} /> 
//         <Route path="/login" element={<Login />} />          */}
//       </Routes>
//     </div>
//     <Header />
//     <div className="app-layout">
//       {isSidebar && <Sidebar isSidebar={isSidebar} />}
//       <main className="main-content">
//         <Routes>         
//           <Route path="/dash" element={<Dashboard />} />
//           <Route path="/team" element={<Team />} />
//           <Route path="/calendar" element={<Dashboard />} />
//         </Routes>
//       </main>
//     </div>
//   </div>
// )}

// export default App





function App() {
  // Load user from localStorage (if any)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isSidebar, setIsSidebar] = useState(true);

  // Route guard for protected pages
  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="app">
      {/* PUBLIC ROUTES */}
      {!user && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<CompanyRegistration />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {/* PRIVATE ROUTES (for logged-in users) */}
      {user && (
        <div className="app-layout">
          <Header user={user} setUser={setUser} />
          {isSidebar && <Sidebar user={user} />}
          <main className="main-content">
            <Routes>
              <Route path="/dash" element={
                <RequireAuth><Dashboard user={user} /></RequireAuth>
              } />
              <Route path="/team" element={
                <RequireAuth><Team user={user} /></RequireAuth>
              } />
              <Route path="/calendar" element={
                <RequireAuth><Dashboard user={user} /></RequireAuth> // placeholder
              } />
              <Route path="*" element={<Navigate to="/dash" />} />
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
