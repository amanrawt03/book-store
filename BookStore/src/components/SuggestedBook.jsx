import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";

const SuggestedBook = ({ bookData }) => {
  const { volumeInfo } = bookData;
  const { title, authors, imageLinks } = volumeInfo;
  
  // Default image or fallback if not available
  const bookCover = imageLinks?.thumbnail || "https://via.placeholder.com/150";
  const bookName = title || "No Title Available";
  const author = authors?.join(", ") || "Unknown Author";

  return (
    <Link
      to={`/book/${bookData.id}`}
      style={{ textDecoration: "none" }} // Remove default underline on Link
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }, // Mobile: column, Desktop: row
          gap: 2,
          alignItems: "flex-start",
          borderTop: "1px solid #ddd",
          padding: "16px",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
          width: 300, // Set a fixed width for the card container
          height: 150, // Set a fixed height for the card container
        }}
      >
        {/* Book Cover Image */}
        <CardMedia
          component="img"
          alt={bookName}
          image={bookCover}
          sx={{
            width: 80, // Set a fixed width for the image
            height: 120, // Set a fixed height for the image
            objectFit: "cover", // Ensure the image covers the container without distorting
            borderRadius: 1,
          }}
        />
        {/* Book Details */}
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Book Title */}
          <Typography 
            variant="h6" 
            sx={{
              fontSize: '1rem',  // Set a smaller font size for the title (adjust as needed)
              fontWeight: 'bold', 
              lineHeight: 1.2, // Adjust line height for better spacing
              overflow: 'hidden', // Ensure long titles don't overflow
              textOverflow: 'ellipsis', // Add ellipsis for overflowed text
              whiteSpace: 'nowrap', // Prevent title from wrapping to next line
            }}
          >
            {bookName}
          </Typography>

          {/* Book Author */}
          <Typography variant="body2" color="textSecondary">
            {author}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SuggestedBook;
