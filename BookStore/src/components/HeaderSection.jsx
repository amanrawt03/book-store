import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Typography, Box } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const HeaderSection = ({ filterBooks}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDropdown = (event) => {
    setAnchorEl(event.currentTarget); // Opens menu on button click
  };

  const closeDropdown = () => {
    setAnchorEl(null); // Closes menu
  };

  const handleFilterChange = (genre) => {
    filterBooks(genre);
    closeDropdown();
  };

  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
        One store for every book
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 300, mb: 4 }}>
        Read your favourite book for free
      </Typography>

      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Select a Book Genre
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDropdown}
            sx={{
              width: '150px',
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: 'rgba(0, 123, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(0, 123, 255, 1)',
              }
            }}
          >
            <FilterAltIcon sx={{ mr: 1 }} />
            Choose Genre
          </Button>
          {/* {filter && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setFilter(null);
                closeDropdown();
              }}
              sx={{
                width: '150px',
                padding: '10px 20px',
                fontSize: '1rem',
                borderColor: 'rgba(255, 255, 255, 0.7)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              Unfilter
            </Button>
          )} */}
        </Box>

        {/* MUI Menu for dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeDropdown}
          MenuListProps={{ onMouseLeave: closeDropdown }} // Close on mouse leave
        >
          {["Fiction", "Self-Help", "Religion", "Juvenile Fiction", "History", "No Filter"].map((genre) => (
            <MenuItem key={genre} onClick={() => handleFilterChange(genre)}>
              {genre}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default HeaderSection;
