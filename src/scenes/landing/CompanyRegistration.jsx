import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanyRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerUsername, setManagerUsername] = useState('');
  const [managerPassword, setManagerPassword] = useState('');
  const [role, setRole] = useState('manager');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault(); 

    const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    const usernameExists = storedCompanies.some((u) => u.managerUsername === managerUsername);

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
        name: companyName,
        manager_name: managerName,
        manager_username: managerUsername,
        manager_password: managerPassword
      });
      
      console.log('Successful signup:', response.data);
      setCompanyName(''); setManagerName(''); setManagerUsername(''); setManagerPassword('');
    } 
    catch (error) {
      if (error.response && error.response.data) {
        console.error('Signup error', error.response.data);
        setError(
          error.response.data.detail ||
          JSON.stringify(error.response.data)
        );
      } else {
        setError('Server error. Please try again.');
      }
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
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;