import React from "react";
import { AppBar, Toolbar, Typography, TextField, Box, IconButton, Badge } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { ExitToApp as ExitToAppIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useSelector } from "react-redux";
const Navbar = ({ searchBookFn, cartItemCount }) => {
  const navigate = useNavigate();

 
  let user = useSelector(state=>state.user.username);
  
  // Search input handler
  const handleOnChange = (e) => {
    searchBookFn(e.target.value);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');  // Clear user data from localStorage
    navigate('/signin');  // Redirect user to login page (or homepage)
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo/Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Book Store
        </Typography>

        {/* Conditional Login or Welcome Message */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Welcome, {user || 'User'}
              </Typography>
              {/* Cart Icon */}
              <IconButton 
                color="inherit" 
                sx={{ marginRight: 2 }}
                onClick={() => navigate('/cart')}
              >
                <Badge 
                  badgeContent={cartItemCount} 
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Logout Icon */}
              <IconButton onClick={handleLogout} color="inherit">
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
            <Link to={'/signup'} style={{ color: 'white', textDecoration: 'none' }}>
              Login/Signup
            </Link>
          )}
        </Box>

        {/* Search Box */}
        <Box component="form" sx={{ display: "flex", gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            onChange={handleOnChange}
            fullWidth
            sx={{ maxWidth: 400 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
