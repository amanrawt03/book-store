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
  const user = useSelector(state => JSON.parse(state.user.username));

  const { volumeInfo } = bookData;
  const { title, authors, imageLinks, pageCount, publishedDate } = volumeInfo;

  const imageSrc = imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1551300329-b91a61fa5ebe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const publishedYear = publishedDate ? publishedDate.split('-')[0] : 'N/A';
  const author = authors && authors.length > 0 ? authors[0] : "J.K. Rowling";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {    
      alert("Login first");
    } else {
      dispatch(add_book({ newBook: bookData, quantity:1 }));
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row', // Book item in a horizontal layout
        boxShadow: 3,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.05)' },
        minWidth: '60vw',
        maxWidth: '60vw'
      }}
      onClick={() => navigate(`/book/${bookData.id}`)}
    >
      <CardMedia
        component="img"
        alt={`${title} Cover`}
        image={imageSrc}
        sx={{
          width: '150px',
          height: '200px',
          objectFit: 'contain',
          borderRadius: '8px',
          margin: '10px',
        }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, minHeight: '200px' }}>
        <div>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Author:</strong> {author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Published:</strong> {publishedYear}
          </Typography>
        </div>

        <div sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <IconButton color="primary" aria-label="add to cart" onClick={handleAddToCart}>
            <AddShoppingCartIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <CurrencyRupeeIcon fontSize="small" />
            {pageCount === 0 ? 655 : pageCount * 3}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookItem;
