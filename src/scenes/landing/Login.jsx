// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // const kBaseURL='http://localhost:8000';
const kBaseURL = 'https://ets-trial-backend.onrender.com';

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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
// import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Alert from "@material-ui/lab/Alert"; // For error message display
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { makeStyles } from '@mui/styles';  // Or use @mui/system (no need for makeStyles in v5)


// const MadeWithLove = () => (
//   <Typography variant="body2" color="textSecondary" align="center">
//     {"Built with love by the "}
//     <Link color="inherit" href="https://material-ui.com/">
//       Material-UI
//     </Link>
//     {" team."}
//   </Typography>
// );

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: "100vh",
//   },
//   image: {
//     backgroundImage: "url(https://source.unsplash.com/random)",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const Login = ({ setUser }) => {
//   const classes = useStyles();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     console.log("handleLogin called", { username, password });

//     try {
//       console.log("Sending axios request...");
//       const response = await axios.post(`${kBaseURL}/login/`, {
//         username,
//         password,
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
//     <Grid container component="main" className={classes.root}>
//       <CssBaseline />
//       <Grid item xs={false} sm={4} md={7} className={classes.image} />
//       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>

//           {/* Display error message if any */}
//           {error && <Alert severity="error" style={{ width: "100%" }}>{error}</Alert>}

//           <form className={classes.form} noValidate onSubmit={handleLogin}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="/signup" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//             <Box mt={5}>
//               <MadeWithLove />
//             </Box>
//           </form>
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Alert from "@mui/material/Alert"; // Correct for MUI v5+



// const MadeWithLove = () => (
//   <Typography variant="body2" color="textSecondary" align="center">
//     {"Built with love by the "}
//     <Link color="inherit" href="https://material-ui.com/">
//       Material-UI
//     </Link>
//     {" team."}
//   </Typography>
// );

// const Login = ({ setUser }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     console.log("handleLogin called", { username, password });

//     try {
//       const response = await axios.post(`${kBaseURL}/login/`, {
//         username,
//         password,
//       });
//       const user = response.data;
//       setUser(user);
//       localStorage.setItem("user", JSON.stringify(user));
//       navigate("/dash");
//     } catch (err) {
//       console.error("Login error:", err);

//       if (err.response) {
//         if (err.response.status === 401) {
//           setError(err.response.data.detail || "Invalid username or password");
//         } else {
//           setError(`Server error: ${err.response.status}`);
//         }
//       } else if (err.request) {
//         setError("No response from server. Is it running?");
//       } else {
//         setError("Request setup error.");
//       }
//     }
//   };

//   return (
//     <Grid container component="main" sx={{ height: "100vh" }}>
//       <CssBaseline />
//       <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: "url(https://source.unsplash.com/random)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} />
//       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <Box sx={{ margin: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <Avatar sx={{ margin: 1, backgroundColor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>

//           {error && <Alert severity="error" sx={{ width: "100%" }}>{error}</Alert>}

//           <form onSubmit={handleLogin} sx={{ width: "100%", marginTop: 1 }}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               // sx={{ margin: 3, 0, 2 }}
//               sx={{ marginTop: 3, marginBottom: 2 }}
//               >

//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="/signup" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//             <Box mt={5}>
//               <MadeWithLove />
//             </Box>
//           </form>
//         </Box>
//       </Grid>
//     </Grid>
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
import Alert from "@mui/material/Alert"; // Updated import

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
      <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: "url(https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ margin: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ margin: 1, backgroundColor: "secondary.main" }}>
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
              sx={{ marginTop: 3, marginBottom: 2 }} // Button margin
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
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
