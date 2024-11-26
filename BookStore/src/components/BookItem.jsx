import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, IconButton, Typography, Grid2 } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const BookItem = ({ bookData }) => {
  const navigate = useNavigate();

  // Extract necessary fields from the book data
  const { volumeInfo } = bookData;
  const { title, authors = [], imageLinks, publishedDate } = volumeInfo;

  // Thumbnail URL (fallback to a placeholder if missing)
  const imageSrc = imageLinks?.thumbnail || 'https://via.placeholder.com/150';

  // Extract year from publishedDate (if available)
  const publishedYear = publishedDate ? publishedDate.split('-')[0] : 'N/A'; // Extract only the year

  // Navigate to book details page when the card is clicked
  const handleOnView = () => {
    navigate(`/book/${bookData.id}`);
  };

  return (
    <Grid2 item xs={12} sm={6} md={3}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '34vh',   // Set height to 34% of viewport height
          width: '27vw',    // Set width to 28% of viewport width
          boxShadow: 3,
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.05)' },
        }}
        onClick={handleOnView}
      >
        {/* CardMedia for the Book Cover */}
        <CardMedia
          component="img"
          alt={`${title} Cover`}
          image={imageSrc}
          sx={{
            width: 'auto',
            height: '80%',   // Reduced height to 80% of the card height
            maxWidth: '100px', // Reduced width
            objectFit: 'cover',
            borderRadius: 1,
            margin: 2,
          }}
        />
        
        {/* CardContent for Book Details */}
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2 }}>
          {/* Title */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              fontSize: '1rem',  // Reduced title font size
              fontWeight: 'bold',
            }}
          >
            {title}
          </Typography>

          {/* Authors */}
          <Typography variant="body2" color="textSecondary">
            <strong>Author(s):</strong> {authors.length > 0 ? authors[0] : "N/A"}
          </Typography>

          {/* Published Year */}
          <Typography variant="body2" color="textSecondary">
            <strong>Published:</strong> {publishedYear || "N/A"}
          </Typography>

          {/* Button Row (Add to Cart + Published Year) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <IconButton color="primary" aria-label="add to cart">
              <AddShoppingCartIcon />
            </IconButton>
            {/* Published Year */}
            <Typography variant="body2" color="textSecondary">
              {publishedYear || "Unknown Year"}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default BookItem;
