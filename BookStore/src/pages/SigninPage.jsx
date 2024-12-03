  import React, { useState } from "react";
  import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Grid2,
    Paper,
    InputAdornment,
    Link as MuiLink,
  } from "@mui/material";
  import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
  import axios from "axios";
  import { useNavigate, Link } from "react-router-dom";
  import { useDispatch } from 'react-redux';
  import { login } from '../slice/userSlice'; // Redux action for login
  import '../styleSheet/SigninPage.css'
  function SigninPage() {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // Display error message if login fails
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
    
      // Send the login data to the server
      axios
        .post("http://localhost:3000/api/auth/login", formData, {withCredentials: true, }) // Send form data in the request body
        .then((response) => {
          console.log(response.data.user)
          const { user } = response.data;
          dispatch(login({ username: user.username }));  // Dispatch to Redux store
          navigate("/");  // Navigate to the homepage or desired page
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setLoading(false);
          setError(error.response?.data?.message || "An error occurred");
        });
    };

    return (
      <Container
        maxWidth="xs"
        className="signin-container"
      >
        <Paper elevation={4} 
        sx={{ padding: 4, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <Typography variant="h3" align="center" gutterBottom 
          className="signin-heading"
          >
            Pustak Viman
          </Typography>

          <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#2C3E50", mb: '25px' }}>
            Sign In
          </Typography>

          {error && (
            <Typography color="error" variant="body2" align="center" 
            className="signin-error"
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
              {/* Email Field */}
              <Grid2 xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#4B9F72" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    backgroundColor: "#fff5e1",  // Soft off-white background
                    borderRadius: "8px",
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4B9F72", // Greenish border
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3b6b47", // Darker green on hover
                    },
                  }}
                />
              </Grid2>

              {/* Password Field */}
              <Grid2 xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type="password"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#4B9F72" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    backgroundColor: "#fff5e1", // Soft off-white background
                    borderRadius: "8px",
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4B9F72", // Greenish border
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3b6b47", // Darker green on hover
                    },
                  }}
                />
              </Grid2>

              {/* Link to Signup Page */}
              <Grid2 xs={12} sx={{ textAlign: "center" }}>
                <MuiLink
                  to="/signup"
                  component={Link}
                  sx={{
                    fontSize: "14px",
                    color: "#4B9F72",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "#3b6b47",
                    },
                  }}
                >
                  Create a new account
                </MuiLink>
              </Grid2>
            </Grid2>

            {/* Sign In Button on Separate Line */}
            <Grid2 xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="success" // Green color
                sx={{
                  mt: '10px',
                  padding: "10px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  "&:hover": {
                    backgroundColor: "#3b6b47", // Darker green
                  },
                  "&:disabled": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Grid2>
          </form>
        </Paper>
      </Container>
    );
  }

  export default SigninPage;
