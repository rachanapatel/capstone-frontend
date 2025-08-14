// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // const kBaseURL='http://localhost:8000';
// const kBaseURL = import.meta.env.VITE_API_URL;

// const CompanyRegistration = () => {
//   const [companyName, setCompanyName] = useState('');
//   const [managerName, setManagerName] = useState('');
//   const [managerUsername, setManagerUsername] = useState('');
//   const [managerPassword, setManagerPassword] = useState('');
//   const [role, setRole] = useState('manager');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (event) => {
//     event.preventDefault(); 

//     const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
//     const usernameExists = storedCompanies.some((u) => u.managerUsername === managerUsername);

//     if (usernameExists) {
//       setError("Username already taken.");
//       return;
//     }

//     const newCompany = { companyName, managerName, managerUsername, managerPassword, role };
//     const updatedCompanies = [...storedCompanies, newCompany];
//     localStorage.setItem("companies", JSON.stringify(updatedCompanies));
//     navigate("/login");

//     try {
//       const response = await axios.post(`${kBaseURL}/signup/`, {
//         name: companyName,
//         manager_name: managerName,
//         manager_username: managerUsername,
//         manager_password: managerPassword
//       });
      
//       console.log('Successful signup:', response.data);
//       setCompanyName(''); setManagerName(''); setManagerUsername(''); setManagerPassword('');
//     } 
//     catch (error) {
//       if (error.response && error.response.data) {
//         console.error('Signup error', error.response.data);
//         setError(
//           error.response.data.detail ||
//           JSON.stringify(error.response.data)
//         );
//       } else {
//         setError('Server error. Please try again.');
//       }
//     }
//   };  

//   return (
//     <div className="register-page">
//       <h2>Register</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Company"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Manager Name"
//           value={managerName}
//           onChange={(e) => setManagerName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Username"
//           value={managerUsername}
//           onChange={(e) => setManagerUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={managerPassword}
//           onChange={(e) => setManagerPassword(e.target.value)}
//         />
//         <button type="submit">Create Account</button>
//       </form>
//     </div>
//   );
// };

// export default CompanyRegistration;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const kBaseURL = import.meta.env.VITE_API_URL;

const CompanyRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerUsername, setManagerUsername] = useState('');
  const [managerPassword, setManagerPassword] = useState('');
  const [role, setRole] = useState('manager');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!companyName) newErrors.companyName = 'Company name is required';
    if (!managerName) newErrors.managerName = 'Manager name is required';
    if (!managerUsername) newErrors.managerUsername = 'Username is required';
    return newErrors;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    const usernameExists = storedCompanies.some((u) => u.managerUsername === managerUsername);

    if (usernameExists) {
      setErrors({ managerUsername: "Username already taken." });
      return;
    }

    const newCompany = { companyName, managerName, managerUsername, managerPassword, role };
    const updatedCompanies = [...storedCompanies, newCompany];
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));

    try {
      await axios.post(`${kBaseURL}/signup/`, {
        name: companyName,
        manager_name: managerName,
        manager_username: managerUsername,
        manager_password: managerPassword
      });

      setCompanyName('');
      setManagerName('');
      setManagerUsername('');
      setManagerPassword('');
      setErrors({});
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({
          api: error.response.data.detail || "Signup failed."
        });
      } else {
        setErrors({ api: 'Server error. Please try again.' });
      }
    }
  };

  return (
    <Container
    component="main"
    maxWidth="xs"
    sx={{
      fontFamily: 'sans-serif',
      textAlign: 'center',
      // minHeight: '100vh', // make it fill viewport height
      display: 'flex',     // enable flex layout
      alignItems: 'center', // vertical centering
      justifyContent: 'center' // horizontal centering
    }}
    >

  <Container
      component="main"
      maxWidth="xs"
      sx={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          // width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
          <LockOutlinedIcon sx={{ color: 'white' }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {errors.api && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.api}
          </Typography>
        )}

        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2} 
          // sx={{ border: '1px solid blue' }}
          >
            <Grid item xs={12} sx={{ width: '100%'}}>
              <TextField
                fullWidth
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={Boolean(errors.companyName)}
                helperText={errors.companyName}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%'}}>
              <TextField
                fullWidth
                label="Manager Name"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                error={Boolean(errors.managerName)}
                helperText={errors.managerName}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%'}}>
              <TextField
                fullWidth
                label="Username"
                value={managerUsername}
                onChange={(e) => setManagerUsername(e.target.value)}
                error={Boolean(errors.managerUsername)}
                helperText={errors.managerUsername}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%'}}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={managerPassword}
                onChange={(e) => setManagerPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Create Account
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" sx={{ color: 'primary.main' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
</Container>

  );
};

export default CompanyRegistration;

