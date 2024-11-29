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
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";

// Regex for password validation
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null); // Error message for user existence
  const [emailError, setEmailError] = useState(""); // Email error message
  const [passwordError, setPasswordError] = useState(""); // Password error message
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Confirm Password error message
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Check if the user already exists
  const checkIfUserExists = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/userInfo?email=${email}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }
  };

  // Password validation function
  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  // Confirm password validation
  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    validateEmail(formData.email);
    validatePassword(formData.password);
    validateConfirmPassword(formData.password, formData.confirmPassword);

    // If there are validation errors, prevent form submission
    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    // Check if the user already exists
    const userExists = await checkIfUserExists(formData.email);

    if (userExists) {
      setError("User with this email already exists.");
    } else {
      // If user doesn't exist, create the new user
      try {
        await axios.post("http://localhost:5000/userInfo", formData);
        dispatch(login({ username: formData.name }));
        navigate("/");
      } catch (error) {
        console.error("Error during user registration:", error);
        setError("An error occurred during registration.");
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Sign Up
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{ marginBottom: 2, fontSize: "14px" }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            {/* Full Name Field */}
            <Grid2 xs={12}>
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
            </Grid2>

            {/* Email Field */}
            <Grid2 xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                  validateEmail(e.target.value); // Validate email on change
                }}
                required
                type="email"
                helperText={emailError}
                error={!!emailError}
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
                onChange={(e) => {
                  handleChange(e);
                  validatePassword(e.target.value); // Validate password on change
                }}
                required
                type="password"
                helperText={passwordError}
                error={!!passwordError}
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

            {/* Confirm Password Field */}
            <Grid2 xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                  validateConfirmPassword(formData.password, e.target.value); // Validate confirm password
                }}
                required
                type="password"
                helperText={confirmPasswordError}
                error={!!confirmPasswordError}
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

            {/* Sign Up Button */}
            <Grid2 xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginLeft: "120px",
                  marginRight: "108px",
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
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupPage;
