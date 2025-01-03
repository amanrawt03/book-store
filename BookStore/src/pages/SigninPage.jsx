import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

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
import {
  Email as EmailIcon,
  Lock as LockIcon,
  WidthFull,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice"; // Redux action for login
import "../styleSheet/SigninPage.css";
function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

    axios
      .post("http://localhost:3000/api/auth/login", formData, {
        withCredentials: true,
      })
      .then((response) => {
        const { user } = response.data;
        dispatch(login({ username: user.username, email: user.email }));
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response?.data?.message || "An error occurred");
      });
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },  
          }
        );
        dispatch(login({ username: userInfo.data.name, email: userInfo.data.email }));
        navigate("/");
      } catch (error) {
        console.error("Google Login Failed:", error);
      }
    },
    onError: () => {
      console.error("Google Login Error");
    },
  });

  return (
    <Container maxWidth="xs" className="signin-container">
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{color: "#2C3E50"}}>
          Pustak Viman
        </Typography>

        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2C3E50", mb: "25px" }}
        >
          Sign In
        </Typography>

        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                sx={{ width: "340px" }}
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type="password"
                sx={{ width: "340px" }}
              />
            </Grid2>
          </Grid2>
          <Grid2 xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="success"
              sx={{ mt: "10px", padding: "10px", borderRadius: "8px" }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Grid2>
        </form>
        {/* Link to Signup Page */}
        <Grid2 xs={12}>
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
        <Button
          variant="outlined"
          fullWidth
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Container>
  );
}
export default SigninPage;
