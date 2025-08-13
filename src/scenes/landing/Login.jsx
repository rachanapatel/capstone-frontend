// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const kBaseURL='http://localhost:8000';
const kBaseURL = import.meta.env.VITE_API_URL;

// const Login = ({ setUser }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     console.log("handleLogin called", { username, password });
  
//     try {
//       console.log("Sending axios request...");
//       const response = await axios.post(`${kBaseURL}/login/`, {
//         username,
//         password
//       }); 
//       console.log("Axios response:", response.data);
  
//       const user = response.data;
//       setUser(user);
//       localStorage.setItem("user", JSON.stringify(user));
//       navigate("/dash");
  
//     } catch (err) {
//       console.error("Login error:", err);
  
//       if (err.response) {
//         console.error("Response status:", err.response.status);
//         console.error("Response data:", err.response.data);
  
//         if (err.response.status === 401) {
//           setError(err.response.data.detail || "Invalid username or password");
//         } else {
//           setError(`Server error: ${err.response.status}`);
//         }
//       } else if (err.request) {
//         console.error("No response received:", err.request);
//         setError("No response from server. Is it running?");
//       } else {
//         console.error("Axios config error:", err.message);
//         setError("Request setup error.");
//       }
//     }
//   };
  
  

//   return (
//     <div className="login-page">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert"; 

const MadeWithLove = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Built with love by the "}
    <Link color="inherit" href="https://material-ui.com/">
      Material-UI
    </Link>
    {" team."}
  </Typography>
);

const SignInSide = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("handleLogin called", { username, password });

    try {
      const response = await axios.post(`${kBaseURL}/login/`, {
        username,
        password,
      });
      const user = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dash");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        if (err.response.status === 401) {
          setError(err.response.data.detail || "Invalid username or password");
        } else {
          setError(`Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        setError("No response from server. Is it running?");
      } else {
        setError("Request setup error.");
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", fontFamily: 'sans-serif', textAlign: 'center' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: "url(https://coolbackgrounds.imgix.net/2ZNzi2Wk9hFtClSONLBumr/57c308a9090ef211ef017737933c755b/blue-gradient-background.png?w=3840&q=60&auto=format,compress)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ margin: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ margin: 1, backgroundColor: "error.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {error && <Alert severity="error" sx={{ width: "100%" }}>{error}</Alert>}

          <form onSubmit={handleLogin} sx={{ width: "100%", marginTop: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 3, marginBottom: 2 }} // Button margin fix
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove />
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
