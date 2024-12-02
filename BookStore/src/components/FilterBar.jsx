import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";

const FilterBar = ({ fetchBooks, queryParam, genreOptions }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  // Apply filters
  const applyFilters = () => {
    const filters = {
      ...(selectedGenre && { genre: selectedGenre }),
      ...(sortOrder && { sort: sortOrder }),
    };

    fetchBooks(queryParam, 0, filters);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelectedGenre(null);
    setSortOrder(null);
    fetchBooks(queryParam, 0); // Fetch with no filters
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        minWidth: "22vw"
      }}
    >
      <Typography variant="h6" gutterBottom>
        Apply Filters
      </Typography>

      {/* Filter by Genre */}
      <Accordion defaultExpanded sx={{ marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filter by Genre</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            displayEmpty
            aria-label="Filter by Genre"
          >
            <MenuItem value="" disabled>
              Select Genre
            </MenuItem>
            {genreOptions.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </AccordionDetails>
      </Accordion>

      {/* Sort by Arrival */}
      <Accordion defaultExpanded sx={{ marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sort by Arrival</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            displayEmpty
            aria-label="Sort by Arrival"
          >
            <MenuItem value="" disabled>
              Select Sort Order
            </MenuItem>
            <MenuItem value="oldToNew">Old to New</MenuItem>
            <MenuItem value="newToOld">New to Old</MenuItem>
          </Select>
        </AccordionDetails>
      </Accordion>

      {/* Buttons */}
      <Divider sx={{ marginY: 2 }} />
      <Button variant="contained" onClick={applyFilters} fullWidth>
        Apply Filters
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleClearFilters} fullWidth>
        Clear All
      </Button>
    </Box>
  );
};

FilterBar.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  queryParam: PropTypes.string.isRequired,
  genreOptions: PropTypes.arrayOf(PropTypes.string),
};

FilterBar.defaultProps = {
  genreOptions: ["fiction", "history", "religion", "science", "self-help"],
};

export default FilterBar;
