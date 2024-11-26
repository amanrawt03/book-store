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
} from "@mui/material";
import { Email as EmailIcon, Lock as LockIcon, Person as PersonIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Error message for user existence
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkIfUserExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/userInfo?email=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user already exists
    const userExists = await checkIfUserExists(formData.email);

    if (userExists) {
      setError("User with this email already exists.");
    } else {
      // If user doesn't exist, create the new user
      try {
        await axios.post("http://localhost:5000/userInfo", formData);
        navigate("/signin");
      } catch (error) {
        console.error("Error during user registration:", error);
        setError("An error occurred during registration.");
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Sign Up
        </Typography>

        {error && (
          <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2, fontSize: '14px' }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Full Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#1976d2" }} />
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

            {/* Link to Sign In Page */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  to="/signin"
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
                  Sign In
                </Link>
              </Typography>
            </Grid>

            {/* Sign Up Button */}
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
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupPage;
