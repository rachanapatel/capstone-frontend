// CompanyRegistration.jsx (or Register.jsx)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const URL = 'https://ets-trial-backend.onrender.com/signup';

const CompanyRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerUsername, setManagerUsername] = useState('');
  const [managerPassword, setManagerPassword] = useState('');
  const [role, setRole] = useState('manager');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  //   const usernameExists = storedUsers.some((u) => u.username === username);

  //   if (usernameExists) {
  //     setError("Username already taken.");
  //     return;
  //   }

  //   const newUser = { username, password, role };
  //   const updatedUsers = [...storedUsers, newUser];

  //   localStorage.setItem("users", JSON.stringify(updatedUsers));
  //   navigate("/login");
  // };

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    const usernameExists = storedCompanies.some((u) => u.username === username);

    if (usernameExists) {
      setError("Username already taken.");
      return;
    }

    const newCompany = { companyName, managerName, managerUsername, managerPassword, role };
    const updatedCompanies = [...storedCompanies, newCompany];
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    navigate("/login");

    try {
      const response = await axios.post('http://localhost:8000/signup/', {
        companyName,
        managerName,
        managerUsername, 
        managerPassword
      });
      console.log('Successful signup:', response.data);
      // Optionally, clear the form or redirect
      setCompanyName(''); setManagerName(''); setManagerUsername(''); setManagerPassword('');
    } catch (error) {
      console.error('Signup error', error);
    }
  };  

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Company"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Manager Name"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={managerUsername}
          onChange={(e) => setManagerUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={managerPassword}
          onChange={(e) => setManagerPassword(e.target.value)}
          required
        />
        {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select> */}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
