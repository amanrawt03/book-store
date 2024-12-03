import React, { useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  ExitToApp as ExitToAppIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slice/userSlice";
import { clear_cart } from "../slice/cartSlice";
import debounce from "lodash.debounce";
import "../styleSheet/Navbar.css";
import OffersCarousal from "./OffersCarousal";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => JSON.parse(state.user.username));
  const cart = useSelector((state) => state.cart.cartArray);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((query) => {
      if (query) {
        navigate(`/searchedBooks?query=${query}`);
      }
    }, 300),
    []
  );

  const handleOnSearch = (e) => {
    handleSearch(e.target.value);
  };

  // Handle logout
  const handleLogout = () => {
    Cookies.remove('token')
    dispatch(logout());
    dispatch(clear_cart());
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#333" }}>
      <OffersCarousal color="#FF0000" />
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
          Pustak Viman
        </Typography>
        <Box component="form" sx={{ display: "flex", marginRight: 3 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by title, author, publisher, or ISBN"
            sx={{
              width: { xs: "200px", sm: "300px", md: "400px" },
              backgroundColor: "#fff",
              borderRadius: "4px",
              "& .MuiInputBase-root": {
                color: "#000", // Text color
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888", // Border color for the search bar
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF0000", // Hover border color
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF0000", // Focused border color
              },
            }}
            onChange={handleOnSearch}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2, color: "white" }}>
                Hey, {user || "User"}
              </Typography>
              <IconButton
                color="inherit"
                sx={{ marginRight: 2 }}
                onClick={() => navigate("/cart")}
              >
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton onClick={handleLogout} color="inherit">
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
            <Link
              to="/signin"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "12px",
              }}
            >
              Login/Signup
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
