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

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Error message for user existence
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

            {/* Link to Sign In Page */}
            <Grid2 xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  to="/signin"
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
                  Sign In
                </Link>
              </Typography>
            </Grid2>

            {/* Sign Up Button in a Separate Row */}
            <Grid2 xs={12}>
              {/* <br></br>
              <br></br> */}

              <Button
                type="submit"
                variant="contained"
                // fullWidth
                color="primary"
                sx={{
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginLeft: '120px',
                  // minWidth:'60px',
                  marginRight:'108px',
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
