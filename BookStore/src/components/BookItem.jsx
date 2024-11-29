import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, IconButton, Typography, Grid2 } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useSelector, useDispatch } from 'react-redux';
import { add_book } from '../slice/cartSlice';

const BookItem = ({ bookData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector(state => JSON.parse(state.user.username));

  // Extract necessary fields from the book data
  const { volumeInfo } = bookData;
  const { title, authors, imageLinks, pageCount, publishedDate } = volumeInfo;

  // Thumbnail URL (fallback to a placeholder if missing)
  const imageSrc = imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1551300329-b91a61fa5ebe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  // Extract year from publishedDate (if available)
  const publishedYear = publishedDate ? publishedDate.split('-')[0] : 'N/A'; // Extract only the year

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {    
      alert("Login first");
    } else {
      dispatch(add_book({ newBook: bookData, quantity:1 }));
    }
  };

  // Fallback to "J.K. Rowling" if authors are not provided
  const author = authors && authors.length > 0 ? authors[0] : "J.K. Rowling";

  return (
    <Grid2 xs={12} sm={6} md={4} key={bookData.id}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack image and content vertically
          height: '100%', // Make sure the card height adapts to content
          boxShadow: 3,
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.05)' },
          width:'20vw'
        }}
        onClick={()=>navigate(`/book/${bookData.id}`)}
      >
        {/* CardMedia for the Book Cover */}
        <CardMedia
          component="img"
          alt={`${title} Cover`}
          image={imageSrc}
          sx={{
            width: '10vw', // Full width of the card
            height: '25vh', // Maintain aspect ratio
            objectFit: 'contain', // Ensure the image covers the space appropriately
            borderRadius: 1,
            marginLeft: '65px',
            marginTop: '15px',
          }}
        />

        {/* CardContent for Book Details */}
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 2,
          flexGrow: 1, // Allow content to grow and fill remaining space
          minHeight: '200px', // Ensure the card has a minimum height
        }}>
          {/* Title */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              flexShrink: 0, // Prevent the title from shrinking
              whiteSpace: 'nowrap', // Ensure the title stays in a single line
              overflow: 'hidden', // Hide overflowed text
              textOverflow: 'ellipsis', // Add ellipsis for overflowed text
            }}
          >
            {title}
          </Typography>

          {/* Authors */}
          <Typography variant="body2" color="textSecondary">
            <strong>Author:</strong> {author}
          </Typography>

          {/* Published Year */}
          <Typography variant="body2" color="textSecondary">
            <strong>Published:</strong> {publishedYear || "N/A"}
          </Typography>

          {/* Button Row (Add to Cart + Price) */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
            <IconButton color="primary" aria-label="add to cart" onClick={handleAddToCart}>
              <AddShoppingCartIcon />
            </IconButton>

            {/* Price */}
            <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 'auto' }}>
              <CurrencyRupeeIcon fontSize="small" />
              {pageCount === 0 ? 655 : pageCount*3}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default BookItem;
