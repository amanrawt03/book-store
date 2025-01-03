import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Delete as DeleteIcon } from "@mui/icons-material";
import { remove_book, update_quantity } from '../slice/cartSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const ViewCartPage = () => {
  const navigate  = useNavigate()
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cartArray);
  
  // If the cart is empty, display a friendly message
  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h6" color="textSecondary">
          Your cart is empty. Please continue shopping!
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => window.location.href = '/'}>
          Continue Shopping
        </Button>
      </Box>
    );
  }

  // Function to handle increasing quantity
  const handleIncreaseQuantity = (id) => {
    dispatch(update_quantity({ id, quantity: 1 }));
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = (id) => {
    dispatch(update_quantity({ id, quantity: -1 }));
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = (id) => {
    dispatch(remove_book({ id }));
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.volumeInfo.pageCount * 3 * item.quantity, 0).toFixed(2);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Your Shopping Cart
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table aria-label="shopping cart table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => {
              const price = item.volumeInfo.pageCount * 3; // Price based on pageCount
              const totalPrice = price * item.quantity; // Total price for the item
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.volumeInfo.imageLinks?.thumbnail}
                      alt={item.volumeInfo.title}
                      style={{
                        width: 50,
                        height: 75,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.volumeInfo.title}</TableCell>
                  <TableCell>{item.volumeInfo.authors?.[0] || "Unknown"}</TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <CurrencyRupeeIcon sx={{ fontSize: '16px' }} />
                      {price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDecreaseQuantity(item.id)}
                      sx={{ minWidth: '15px', marginRight: 1 }}
                    >
                      -
                    </Button>
                    <TextField
                      value={item.quantity}
                      InputProps={{ readOnly: true }}
                      sx={{
                        width: 40,
                        textAlign: "center",
                        marginRight: 1,
                      }}
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleIncreaseQuantity(item.id)}
                      sx={{ minWidth: 30 }}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <CurrencyRupeeIcon sx={{ fontSize: '18px' }} />
                      {totalPrice.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleRemoveItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <Typography variant="h6">Total: <CurrencyRupeeIcon sx={{ fontSize: '22px' }} />{calculateTotal()}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: "10px 20px" }}
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default ViewCartPage;