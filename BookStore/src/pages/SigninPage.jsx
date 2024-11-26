import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slice/userSlice'; // Redux action for login

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
  
    // Make the API request to get the user info
    axios
      .get("http://localhost:5000/userInfo")  // Correct API endpoint for user data
      .then((response) => {
        // Find the user by email and password from the response
        const user = response.data.find(
          (user) => user.email === formData.email && user.password === formData.password
        );
  
        if (user) {
          dispatch(login({ username: user.username || user.name }));  // Safely access username or name
          navigate("/");  // Navigate to the homepage or desired page
        } else {
          // Handle invalid credentials
          setError("Invalid email or password");
        }
  
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setLoading(false);
        setError("Invalid credentials or server error");
      });
  };
  

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Sign In
        </Typography>

        {error && (
          <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2, fontSize: '14px' }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Email Field */}
            <Grid item xs={12}>
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
                        <EmailIcon sx={{ color: "#1976d2" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1565c0",
                  },
                }}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
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
                        <LockIcon sx={{ color: "#1976d2" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1565c0",
                  },
                }}
              />
            </Grid>

            {/* Link to Signup Page */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <MuiLink
                to="/signup"
                component={Link}
                sx={{
                  fontSize: "14px",
                  color: "#1976d2",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#1565c0",
                  },
                }}
              >
                Create a new account
              </MuiLink>
            </Grid>

            {/* Sign In Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                sx={{
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                  "&:disabled": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default SigninPage;
