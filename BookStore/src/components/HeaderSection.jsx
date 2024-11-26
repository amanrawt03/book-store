import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Typography, Box } from "@mui/material";

const HeaderSection = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDropdown = (event) => {
    setAnchorEl(event.currentTarget); // Opens menu on button click
  };

  const closeDropdown = () => {
    setAnchorEl(null); // Closes menu
  };

  const handleFilterChange = (genre) => {
    setFilter(genre);
    closeDropdown();
  };

  return (
    <Box className="jumbotron text-center" py={4}>
      <Box className="container">
        <Typography variant="h4" mt={2} gutterBottom>
          One store for every book
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Read your favourite book for free{" "}
        </Typography>

        <Box className="container mt-5">
          <Typography variant="h5">Select a Book Genre</Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleDropdown}
              sx={{ marginBottom: 2 }}
            >
              Choose Genre
            </Button>
            {filter && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setFilter(null);
                  closeDropdown();
                }}
                sx={{ marginLeft: 2, marginBottom: 2 }}
              >
                Unfilter
              </Button>
            )}
          </Box>

          {/* MUI Menu for dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeDropdown}
            MenuListProps={{ onMouseLeave: closeDropdown }} // Close on mouse leave
          >
            {["Fiction", "Mathematics", "Religion", "Juvenile Fiction", "History"].map((genre) => (
              <MenuItem
                key={genre}
                onClick={() => handleFilterChange(genre)}
              >
                {genre}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderSection;
