import React from "react";
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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slice/userSlice";
import { clear_cart } from "../slice/cartSlice";
import '../styleSheet/Navbar.css'
import OffersCarousal from "./OffersCarousal";
const Navbar = ({ searchBookFn, cartItemCount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = useSelector((state) => JSON.parse(state.user.username));
  let cart = useSelector((state) => state.cart.cartArray);

  // Search input handler
  const handleOnChange = (e) => {
    searchBookFn(e.target.value);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clear_cart());
  };

  return (
    <AppBar position="sticky" color="primary">
      <OffersCarousal color="#FF0000"/>
      <Toolbar>
        {/* Logo/Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Book Store
        </Typography>

        {/* Search Box */}
        <Box component="form" sx={{ display: "flex", marginRight: 3 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by title, author, publisher or ISBN"
            onChange={handleOnChange}
            sx={{ width: "400px", marginRight: "350px" }}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton sx={{ padding: 0 }}>
                    <SearchIcon />
                  </IconButton>
                ),
              },
            }}
          />
        </Box>

        {/* Conditional Login or Welcome Message */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Hey, {user || "User"}
              </Typography>
              {/* Cart Icon */}
              <IconButton
                color="inherit"
                sx={{ marginRight: 2 }}
                onClick={() => navigate("/cart")}
              >
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Logout Icon */}
              <IconButton onClick={handleLogout} color="inherit">
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
            <Link
              to={"/signin"}
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
