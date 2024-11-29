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
    <Container maxWidth="xs" sx={{ mt: 10, padding:'100px' }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb:'25px'}}>
          Sign In
        </Typography>

        {error && (
          <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2, fontSize: '14px' }}>
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
            </Grid2>

            {/* Link to Signup Page */}
            <Grid2 xs={12} sx={{ textAlign: "center" }}>
              <MuiLink
                to="/signup"
                component={Link}
                sx={{
                  fontSize: "14px",
                  color: "#2E1B57",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#1565c0",
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
              color="primary"
              sx={{
                mt:'10px',
                padding: "10px",
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
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
}

export default SigninPage;
